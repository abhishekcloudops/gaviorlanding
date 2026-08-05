# Gavior Production Deployment Guide

Complete documentation for deploying Gavior Next.js application to AWS EC2 with automated CI/CD via GitHub Actions.

## 📋 Quick Navigation

### Getting Started

1. **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Start here for complete setup
   - EC2 instance launch
   - DNS configuration
   - Server provisioning
   - SSH key setup
   - GitHub Actions configuration

2. **[GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md)** - Configure GitHub Secrets
   - Create SSH key pair
   - Add public key to EC2
   - Get host key fingerprint
   - Add secrets to GitHub
   - Verify configuration

### Deployment Process

3. **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Before deploying
   - Code quality checks
   - Environment verification
   - Pre-deployment validation
   - Post-deployment verification
   - Monitoring checklist

### Ongoing Operations

4. **[MONITORING_GUIDE.md](MONITORING_GUIDE.md)** - Monitor production
   - Health checks
   - System monitoring
   - SSL certificate monitoring
   - Performance metrics
   - Automated monitoring

5. **[SECURITY_BEST_PRACTICES.md](SECURITY_BEST_PRACTICES.md)** - Security hardening
   - SSH access control
   - Firewall configuration
   - Secrets management
   - Dependency auditing
   - Regular security updates

### Troubleshooting

6. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
   - Workflow failures
   - Application runtime issues
   - Nginx configuration errors
   - SSL certificate issues
   - Performance problems

7. **[ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md)** - Rollback procedures
   - Automatic rollback
   - Manual rollback
   - Zero-downtime rollback
   - Database rollback
   - Recovery procedures

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│              GitHub Repository                      │
│            (Push to main branch)                    │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│        GitHub Actions Workflow                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ 1. Validate: npm ci, lint, build locally    │  │
│  │ 2. Deploy: SSH to EC2 and deploy            │  │
│  │ 3. Verify: Health checks and monitoring     │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│              EC2 Production Server                  │
│  ┌──────────────────────────────────────────────┐  │
│  │ Nginx (80/443)                               │  │
│  │  │ Reverse proxy, SSL, caching               │  │
│  │  ├─ SecurityHeaders                          │  │
│  │  ├─ Gzip compression                         │  │
│  │  └─ WebSocket support                        │  │
│  └──────────┬───────────────────────────────────┘  │
│             │                                      │
│  ┌──────────▼───────────────────────────────────┐  │
│  │ PM2 Cluster (2 Node.js instances)           │  │
│  │  │ Next.js Application                       │  │
│  │  ├─ Instance 1 (Port 3000)                  │  │
│  │  └─ Instance 2 (Port 3000)                  │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## 🚀 Deployment Workflow

### First Time Setup (One-Time)

```bash
# 1. Launch EC2 instance
# 2. Configure DNS records
# 3. Clone repository on EC2
# 4. Run bootstrap script
# 5. Create SSH deployment key
# 6. Add secrets to GitHub
# 7. Test workflow
```

**Time to complete**: 20-30 minutes

### Automatic Deployments (Every Push to main)

```bash
# 1. Push code to main branch
git push origin main

# 2. GitHub Actions automatically:
#    - Checks out code
#    - Installs dependencies
#    - Runs linter
#    - Builds application
#    - Connects to EC2 via SSH
#    - Deploys new version
#    - Performs health check
#    - Rolls back if needed

# 3. Deployment complete!
# 4. Monitor logs and metrics
```

**Time per deployment**: 5-10 minutes

## 📁 Directory Structure

```
deploy/
├── README.md                      # This file
├── PRODUCTION.md                  # Production overview
├── DEPLOYMENT_GUIDE.md            # Complete setup guide
├── DEPLOYMENT_CHECKLIST.md        # Pre-deployment checklist
├── GITHUB_SECRETS_SETUP.md        # GitHub secrets configuration
├── MONITORING_GUIDE.md            # Monitoring and alerting
├── ROLLBACK_GUIDE.md              # Rollback procedures
├── TROUBLESHOOTING.md             # Common issues
├── SECURITY_BEST_PRACTICES.md     # Security hardening
│
├── nginx/                         # Nginx configuration
│   ├── gavior.http.conf          # HTTP redirect config
│   ├── gavior.conf               # HTTPS production config
│   └── gavior-websocket.conf     # WebSocket support
│
├── pm2/                           # PM2 configuration
│   └── ecosystem.config.cjs      # Cluster configuration
│
├── bootstrap-ec2.sh              # One-time server setup
├── deploy-remote.sh              # Deployment and rollback script
│
├── gavior.service                # Systemd service (optional)
├── gavior-deploy.sudoers         # Sudo configuration
├── gavior-actions-runner.service # GitHub Actions runner
└── gavior-tunnel.service         # SSH tunnel (optional)
```

## 🔑 Required Secrets

Configure these in GitHub Settings → Secrets and variables → Actions:

| Secret | Example | Purpose |
|--------|---------|---------|
| `EC2_HOST` | `54.123.45.67` | EC2 public IP |
| `EC2_USER` | `ubuntu` | SSH user |
| `EC2_SSH_KEY` | `-----BEGIN OPENSSH...` | Private key for SSH |
| `APP_DIRECTORY` | `/home/ubuntu/gaviorlanding` | App location on server |
| `DOMAIN_NAME` | `gavior.in` | Primary domain |
| `EC2_KNOWN_HOSTS` | `54.123.45.67 ecdsa-sha2-nistp256...` | Host key fingerprint |

See [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md) for detailed instructions.

## 🔄 Deployment Process

### Before Deployment

```bash
# Run local validation
npm run lint      # ✅ Check for linting errors
npm run build     # ✅ Build the application
npm audit         # ✅ Check for vulnerabilities

# Optional: Run tests
npm test

# Use DEPLOYMENT_CHECKLIST.md before pushing
```

### During Deployment

1. **Push to main branch**:
   ```bash
   git push origin main
   ```

2. **GitHub Actions automatically**:
   - Validates code (lint, build)
   - Connects to EC2 via SSH
   - Pulls latest code
   - Installs dependencies
   - Builds application
   - Reloads PM2 gracefully
   - Performs health check
   - Rolls back if needed

3. **Monitor workflow**:
   - Go to Actions tab
   - Watch real-time progress
   - Check for any failures

### After Deployment

```bash
# Verify deployment
curl -I https://gavior.in

# Check application status
ssh ubuntu@YOUR_EC2_PUBLIC_IP
pm2 status

# Monitor logs
pm2 logs gavior --lines 50

# Watch real-time
pm2 monit
```

## 🔍 Monitoring Production

### Daily Health Checks

```bash
# Application responding
curl -I https://gavior.in

# Process status
pm2 status

# Resource usage
free -h && df -h
```

### Weekly Tasks

```bash
# Review error logs
tail -n 100 /var/log/nginx/error.log

# Check certificate expiry
sudo certbot certificates

# System updates
apt list --upgradable
```

### Monthly Maintenance

```bash
# Update system packages
sudo apt-get update && sudo apt-get upgrade -y

# Update npm packages
npm audit
npm update

# Create EC2 snapshot
aws ec2 create-snapshot --volume-id vol-xxxxx
```

## 🚨 Emergency Procedures

### Application Down

```bash
# 1. SSH to server
ssh ubuntu@YOUR_EC2_PUBLIC_IP

# 2. Check status
pm2 status
pm2 logs gavior --lines 100

# 3. Restart if needed
pm2 restart gavior

# 4. If still down, check resources
free -h
df -h

# 5. Check Nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### Disk Full

```bash
# 1. Check usage
df -h

# 2. Clean npm cache
npm cache clean --force

# 3. Remove old node_modules
rm -rf node_modules
npm ci

# 4. Clear old logs
pm2 flush
```

### Memory Leak

```bash
# 1. Monitor memory
pm2 describe gavior | grep memory

# 2. Restart if increasing
pm2 restart gavior

# 3. If recurring, rollback
git reset --hard HEAD~1
npm ci
npm run build
pm2 restart gavior
```

### Need to Rollback

See [ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md) for complete procedures:

```bash
# Quick rollback to previous commit
git reset --hard HEAD~1
npm ci
npm run build
pm2 reload deploy/pm2/ecosystem.config.cjs --only gavior
pm2 save
```

## 📊 Performance Monitoring

### Response Times

```bash
# Check typical response time
curl -w "@response-time.txt" https://gavior.in/

# View Nginx access logs
sudo tail -f /var/log/nginx/access.log
```

### Resource Usage

```bash
# Real-time dashboard
pm2 monit

# Process details
pm2 describe gavior

# System resources
watch -n 1 "free -h && df -h && top -b -n 1 | head -20"
```

### Certificate Monitoring

```bash
# View certificate status
sudo certbot certificates

# Check expiry date
echo | openssl s_client -servername gavior.in -connect gavior.in:443 | \
  openssl x509 -noout -dates

# Days until renewal
# (Certificate auto-renews 30 days before expiry)
```

## 🔐 Security Checklist

- [ ] SSH key restricted to trusted IPs
- [ ] Password authentication disabled
- [ ] Firewall (UFW) properly configured
- [ ] SSL certificates auto-renewing
- [ ] Security headers enabled
- [ ] npm dependencies audited
- [ ] No hardcoded secrets in code
- [ ] Backup strategy in place
- [ ] Access logs reviewed regularly
- [ ] Security updates applied

See [SECURITY_BEST_PRACTICES.md](SECURITY_BEST_PRACTICES.md) for details.

## 📚 Additional Resources

### Next.js Documentation
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/optimizing-performance)

### DevOps Tools
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)

### AWS Documentation
- [EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- [Security Best Practices](https://docs.aws.amazon.com/security/)

### GitHub Actions
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub CLI Documentation](https://cli.github.com/)

## 💬 Getting Help

### Common Issues

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for:
- Workflow failures
- Application errors
- Performance issues
- SSL certificate problems
- Nginx configuration errors

### Support Resources

1. **Logs and Diagnostics**:
   ```bash
   pm2 logs gavior --lines 200
   sudo tail -f /var/log/nginx/error.log
   ```

2. **Status Commands**:
   ```bash
   pm2 status
   sudo systemctl status nginx
   sudo certbot certificates
   ```

3. **Documentation**:
   - Check TROUBLESHOOTING.md first
   - Review MONITORING_GUIDE.md
   - Look at DEPLOYMENT_GUIDE.md

## 📝 Changelog

### Version 1.0 (2024-01-15)

- Initial production setup
- Complete CI/CD pipeline
- Comprehensive documentation
- Monitoring and alerting
- Security hardening
- Rollback procedures

## 🏁 Getting Started

### First Time Setup

```bash
# Follow these guides in order:
1. DEPLOYMENT_GUIDE.md        # Complete setup (20-30 min)
2. GITHUB_SECRETS_SETUP.md    # Configure GitHub (10-15 min)
3. DEPLOYMENT_CHECKLIST.md    # Pre-deployment checks
4. Test by pushing to main
```

### Regular Operations

```bash
# Before each deployment:
1. DEPLOYMENT_CHECKLIST.md    # Run pre-deployment checks

# After each deployment:
1. MONITORING_GUIDE.md        # Monitor for issues
2. Verify with DEPLOYMENT_CHECKLIST.md

# Regular maintenance:
1. MONITORING_GUIDE.md        # Daily/weekly tasks
2. SECURITY_BEST_PRACTICES.md # Monthly security review
```

## 📞 Quick Reference

```bash
# Connect to server
ssh ubuntu@YOUR_EC2_PUBLIC_IP

# Check application
pm2 status
pm2 logs gavior

# Check system
free -h          # Memory
df -h            # Disk
top -b -n 1      # Processes

# Check web server
sudo systemctl status nginx
sudo nginx -t

# Check SSL
sudo certbot certificates

# View real-time stats
pm2 monit

# Emergency restart
pm2 restart gavior

# Manual rollback
git reset --hard HEAD~1 && npm ci && npm run build && pm2 restart gavior
```

---

**Last Updated**: 2024-01-15  
**Version**: 1.0  
**Maintainer**: DevOps Team

For questions or issues, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or check the specific guide for your task.
