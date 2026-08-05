# Troubleshooting Guide for Gavior

This guide helps diagnose and fix common issues with the Gavior production deployment.

## Deployment Workflow Issues

### Workflow Fails at "Build Application"

**Symptom**: GitHub Actions shows `npm run build` fails

**Diagnosis**:
```bash
# Try building locally first
npm ci
npm run build

# Check for errors
npm run build 2>&1 | tail -n 50
```

**Solutions**:
1. **TypeScript/ESLint errors**: Fix locally and push
   ```bash
   npm run lint -- --fix
   git add .
   git commit -m "fix: linting errors"
   git push
   ```

2. **Missing dependencies**: Check package.json
   ```bash
   npm ci --no-audit
   npm ls
   ```

3. **Out of memory**: Node ran out of memory during build
   ```bash
   # Increase Node memory limit
   export NODE_OPTIONS="--max_old_space_size=4096"
   npm run build
   ```

4. **Node version mismatch**: Verify you're using Node 22
   ```bash
   node --version  # Should be v22.x.x
   nvm use 22  # If using nvm
   ```

### Workflow Fails at "Test SSH Connection"

**Symptom**: GitHub Actions shows SSH connection failed

**Diagnosis**:
```bash
# From your local machine
ssh -i ~/gavior-deploy-key ubuntu@YOUR_EC2_PUBLIC_IP "echo 'Test'"
```

**Solutions**:

1. **SSH key permissions wrong**:
   ```bash
   chmod 600 ~/.ssh/deploy_key
   chmod 700 ~/.ssh
   ```

2. **SSH key not added to EC2 authorized_keys**:
   ```bash
   # On EC2
   cat >> ~/.ssh/authorized_keys << 'EOF'
   YOUR_PUBLIC_KEY_HERE
   EOF
   chmod 600 ~/.ssh/authorized_keys
   ```

3. **Security group blocks port 22**:
   ```bash
   # AWS CLI
   aws ec2 authorize-security-group-ingress \
     --group-id sg-xxxxxxxxx \
     --protocol tcp --port 22 \
     --cidr YOUR_IP/32
   ```

4. **EC2 instance is stopped**:
   ```bash
   # Start it via AWS console or CLI
   aws ec2 start-instances --instance-ids i-xxxxxxxxx
   ```

5. **GitHub secret `EC2_KNOWN_HOSTS` is wrong**:
   ```bash
   # Get correct value
   ssh-keyscan -H YOUR_EC2_PUBLIC_IP
   
   # Update GitHub secret with this output
   ```

### Workflow Fails at "Deploy Application"

**Symptom**: `npm ci` or `npm run build` fails on server

**Diagnosis**:
```bash
# SSH to EC2 and check
ssh ubuntu@YOUR_EC2_PUBLIC_IP
cd /home/ubuntu/gaviorlanding
npm ci
npm run build
```

**Solutions**:

1. **Disk full**:
   ```bash
   df -h
   # Clean up
   npm cache clean --force
   rm -rf node_modules
   npm ci
   ```

2. **Permissions denied**:
   ```bash
   # Check ownership
   ls -la /home/ubuntu/gaviorlanding
   
   # Fix if needed
   sudo chown -R ubuntu:ubuntu /home/ubuntu/gaviorlanding
   chmod -R u+rwx /home/ubuntu/gaviorlanding
   ```

3. **Git authentication failed**:
   ```bash
   git fetch origin
   # If it fails, SSH key for ubuntu user might be wrong
   # Verify: ssh -v git@github.com
   ```

## Application Runtime Issues

### Application Won't Start (HTTP 502 Bad Gateway)

**Symptom**: Browser shows "502 Bad Gateway" or "Service Unavailable"

**Diagnosis**:
```bash
# SSH to EC2
ssh ubuntu@YOUR_EC2_PUBLIC_IP

# Check PM2 status
pm2 status

# Check logs
pm2 logs gavior --lines 100

# Check if app is listening
curl http://127.0.0.1:3000/

# Check Nginx
sudo nginx -t
curl -I http://localhost/
```

**Solutions**:

1. **PM2 process crashed**:
   ```bash
   pm2 restart gavior
   pm2 logs gavior
   sleep 2
   curl http://127.0.0.1:3000/
   ```

2. **Port 3000 already in use**:
   ```bash
   sudo lsof -i :3000
   # Kill the process and restart
   sudo kill -9 <PID>
   pm2 restart gavior
   ```

3. **Node.js out of memory**:
   ```bash
   pm2 describe gavior | grep memory
   
   # Increase memory limit in ecosystem.config.cjs
   max_memory_restart: "750M"  # Increase from 500M
   
   # Restart
   pm2 restart gavior
   ```

4. **Missing environment variables**:
   ```bash
   # Check .env file exists
   ls -la /home/ubuntu/gaviorlanding/.env*
   
   # Update if needed
   nano /home/ubuntu/gaviorlanding/.env.local
   
   # Restart
   pm2 restart gavior --update-env
   ```

### Application Runs but Responds Slowly

**Symptom**: Website loads but is very slow

**Diagnosis**:
```bash
# Check response time
time curl -s http://127.0.0.1:3000/ >/dev/null

# Check resource usage
pm2 monit

# Check logs for errors
pm2 logs gavior --lines 50

# Check system resources
free -h
df -h
top -b -n 1
```

**Solutions**:

1. **Memory leak**:
   ```bash
   # Monitor memory over time
   for i in {1..10}; do 
     pm2 describe gavior | grep memory
     sleep 5
   done
   
   # If increasing: restart
   pm2 restart gavior
   
   # Investigate code for memory leak
   ```

2. **Disk I/O bottleneck**:
   ```bash
   # Check disk activity
   sudo iostat -x 1 10
   
   # If disk is saturated:
   # - Check .next folder size: du -sh .next
   # - Check logs: du -sh node_modules
   # - Consider upgrading EC2 instance
   ```

3. **CPU at 100%**:
   ```bash
   # Find hot code
   pm2 logs gavior --lines 200
   
   # Check what's consuming CPU
   top -b -n 1 | grep node
   ```

4. **Database query slow**:
   ```bash
   # Enable query logging in application
   # Check database connection string
   cat /home/ubuntu/gaviorlanding/.env.local | grep DATABASE
   ```

### Application Logs Show Errors

**Symptom**: PM2 logs show repeated errors

**Examples and solutions**:

**Error: "ECONNREFUSED 127.0.0.1:3000"**
```bash
# Application not listening on port 3000
pm2 logs gavior
# Look for "listen" or startup errors
# Usually means dependency issue or environment var problem
npm ci
pm2 restart gavior
```

**Error: "Error: listen EADDRINUSE :::3000"**
```bash
# Port already in use
sudo lsof -i :3000
sudo kill -9 <PID>
pm2 restart gavior
```

**Error: "Cannot find module"**
```bash
# Missing dependency
npm ci
pm2 restart gavior
```

**Error: "SyntaxError: Unexpected token"**
```bash
# Syntax error in code
# Deploy newer version
git reset --hard origin/main
npm ci
npm run build
pm2 restart gavior
```

## Nginx and SSL Issues

### HTTPS Certificate Error

**Symptom**: Browser shows certificate warning or "ERR_CERT_DATE_INVALID"

**Diagnosis**:
```bash
# Check certificate status
sudo certbot certificates

# Check expiry
echo | openssl s_client -connect gavior.in:443 2>/dev/null | \
  openssl x509 -noout -dates
```

**Solutions**:

1. **Certificate expired**:
   ```bash
   # Manually renew
   sudo certbot renew
   
   # Reload Nginx
   sudo systemctl reload nginx
   
   # Verify
   curl -I https://gavior.in
   ```

2. **Certificate doesn't match domain**:
   ```bash
   # Check certificate subject
   echo | openssl s_client -connect gavior.in:443 2>/dev/null | \
     openssl x509 -noout -subject
   
   # Should include gavior.in
   # If not, revoke and request new:
   sudo certbot revoke --cert-path /etc/letsencrypt/live/gavior.in/cert.pem
   sudo certbot certonly --nginx -d gavior.in -d www.gavior.in
   ```

3. **Auto-renewal not working**:
   ```bash
   # Check timer status
   sudo systemctl status certbot.timer
   
   # Enable if disabled
   sudo systemctl enable --now certbot.timer
   
   # Test renewal
   sudo certbot renew --dry-run
   ```

### Nginx Configuration Error

**Symptom**: Nginx won't start or `sudo nginx -t` shows error

**Diagnosis**:
```bash
sudo nginx -t
# Shows specific error location
```

**Solutions**:

1. **Syntax error in config**:
   ```bash
   # Restore previous version
   sudo cp /etc/nginx/sites-available/gavior /etc/nginx/sites-available/gavior.backup
   
   # Edit and fix
   sudo nano /etc/nginx/sites-available/gavior
   
   # Test
   sudo nginx -t
   sudo systemctl reload nginx
   ```

2. **Permission denied**:
   ```bash
   # Check file permissions
   ls -la /etc/nginx/sites-available/gavior
   
   # Should be 644 (-rw-r--r--)
   sudo chmod 644 /etc/nginx/sites-available/gavior
   sudo chown root:root /etc/nginx/sites-available/gavior
   ```

### Website Shows Old Content

**Symptom**: Website shows cached/old version after deployment

**Solutions**:

1. **Nginx cache issue**:
   ```bash
   # Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
   
   # Clear Nginx cache
   sudo systemctl restart nginx
   ```

2. **CDN cache** (if using one):
   ```bash
   # Purge CDN cache
   # (depends on which CDN you're using)
   ```

3. **Browser service worker cache**:
   ```bash
   # Add cache-busting header
   # Edit nginx config and reload
   ```

## SSL Connection Issues

### Cloudflare SSL Handshake Fails

**Symptom**: "Error 525: SSL handshake failed"

**Solutions**:

1. **SSL mode mismatch**:
   ```bash
   # Cloudflare → Always use HTTPS
   # Not "Flexible" (HTTP to origin)
   ```

2. **Certificate not trusted**:
   ```bash
   # Ensure certificate is from Let's Encrypt
   sudo certbot certificates
   
   # Update if needed
   sudo certbot renew
   ```

## Performance Issues

### Slow Page Loads

1. **Check Next.js build optimization**:
   ```bash
   npm run build
   # Look for warnings about large chunks
   
   # Optimize in next.config.js if needed
   ```

2. **Enable compression**:
   ```bash
   # Already in nginx config
   # Verify it's working
   curl -I -H "Accept-Encoding: gzip" https://gavior.in/
   # Should show: Content-Encoding: gzip
   ```

3. **Check database queries** (if using):
   ```bash
   # Enable slow query logging
   # Profile queries
   ```

## Memory/Disk Issues

### Out of Disk Space

**Diagnosis**:
```bash
df -h
du -sh /home/ubuntu/gaviorlanding/*
```

**Solutions**:

1. **Clear npm cache**:
   ```bash
   npm cache clean --force
   ```

2. **Remove old node_modules and rebuild**:
   ```bash
   cd /home/ubuntu/gaviorlanding
   rm -rf node_modules package-lock.json
   npm ci
   ```

3. **Clear old logs**:
   ```bash
   pm2 delete gavior  # Removes logs
   pm2 start deploy/pm2/ecosystem.config.cjs --only gavior
   ```

4. **Remove temporary files**:
   ```bash
   rm -rf /tmp/*
   sudo apt-get clean
   ```

### Out of Memory

**Diagnosis**:
```bash
free -h
pm2 describe gavior | grep memory
```

**Solutions**:

1. **Reduce PM2 instance count**:
   ```bash
   # Edit ecosystem.config.cjs
   # instances: 1  # from 2
   
   pm2 restart gavior
   ```

2. **Upgrade EC2 instance type**:
   ```bash
   # AWS Console: Stop → Change instance type → Start
   # Or via CLI:
   aws ec2 stop-instances --instance-ids i-xxxxxxxxx
   aws ec2 modify-instance-attribute --instance-id i-xxxxxxxxx \
     --instance-type "{\"Value\": \"t3.medium\"}"
   aws ec2 start-instances --instance-ids i-xxxxxxxxx
   ```

## Getting Help

### Collect Debugging Information

When troubleshooting, collect this information:

```bash
ssh ubuntu@YOUR_EC2_PUBLIC_IP

# System info
echo "=== System ===" && uname -a && hostnamectl

# Application status
echo "=== Application ===" && pm2 describe gavior

# Nginx status
echo "=== Nginx ===" && sudo systemctl status nginx

# Logs
echo "=== PM2 Logs ===" && pm2 logs gavior --lines 100
echo "=== Nginx Errors ===" && sudo tail -n 50 /var/log/nginx/error.log

# Resources
echo "=== Resources ===" && free -h && df -h && top -b -n 1 | head -20

# Network
echo "=== Network ===" && netstat -tlnp | grep -E ':(22|80|443|3000)'

# SSL
echo "=== SSL ===" && sudo certbot certificates
```

### Common Investigation Commands

```bash
# Real-time monitoring
pm2 monit

# Stream logs
pm2 logs gavior

# Check all processes
ps aux | grep node

# Monitor network
netstat -tulpn

# Check listening ports
sudo lsof -i -P -n | grep LISTEN

# Trace a request
curl -v https://gavior.in/

# Performance metrics
ab -n 100 -c 10 https://gavior.in/  # Apache Bench

# Network connectivity
curl -v telnet://127.0.0.1:3000
```

## Preventative Maintenance

To avoid many of these issues:

1. **Daily**:
   ```bash
   curl -I https://gavior.in
   pm2 status
   ```

2. **Weekly**:
   ```bash
   df -h
   free -h
   pm2 logs gavior --lines 50
   sudo nginx -t
   ```

3. **Monthly**:
   ```bash
   sudo apt-get update && apt-get upgrade -y
   sudo certbot renew --dry-run
   pm2 save
   ```

See [MONITORING_GUIDE.md](MONITORING_GUIDE.md) for comprehensive monitoring setup.
