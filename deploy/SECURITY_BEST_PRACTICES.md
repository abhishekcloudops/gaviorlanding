# Security Best Practices for Gavior Production

This guide covers security hardening and best practices for the Gavior production environment.

## SSH Access Security

### 1. Restrict SSH Access

```bash
# Only allow SSH from specific IPs (YOUR_IP only)
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxxxxxx \
  --protocol tcp --port 22 \
  --cidr YOUR_TRUSTED_IP/32
```

### 2. SSH Key Management

```bash
# Use ED25519 keys (stronger than RSA)
ssh-keygen -t ed25519 -f ~/.ssh/gavior-deploy-key -N "" \
  -C "gavior-deploy-$(date +%Y-%m-%d)"

# Never use passphrase for automation keys (reduces usability)
# Always use passphrases for personal keys

# Rotate keys regularly (every 90 days)
# Keep a key rotation log:
# - Created: 2024-01-01
# - Added to EC2: 2024-01-02
# - Removed from EC2: 2024-04-01
```

### 3. Disable Root Login

```bash
# On EC2 (already disabled on Ubuntu by default)
sudo sshd_config /etc/ssh/sshd_config
# Should contain: PermitRootLogin no

sudo systemctl reload ssh
```

### 4. Disable Password Authentication

```bash
# Use SSH keys only, no passwords
sudo sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

sudo systemctl reload ssh
```

### 5. Configure SSH Agent Forwarding

```bash
# Add to ~/.ssh/config (on your local machine)
Host ec2-production
  HostName YOUR_EC2_PUBLIC_IP
  User ubuntu
  IdentityFile ~/.ssh/gavior-deploy-key
  AddKeysToAgent yes
  IdentitiesOnly yes
  StrictHostKeyChecking accept-new
```

## Firewall Configuration

### 1. UFW Setup (Already Done by Bootstrap)

```bash
# Verify UFW is enabled and configured
sudo ufw status

# Should show:
# Status: active
# To Action From
# -- ------ ----
# 22 ALLOW Anywhere
# 80/tcp ALLOW Anywhere
# 443/tcp ALLOW Anywhere
```

### 2. Block Unnecessary Ports

```bash
# Make sure no other ports are exposed
sudo ufw status numbered

# Remove any unnecessary rules
sudo ufw delete <rule_number>
```

### 3. Rate Limiting

```bash
# Add rate limiting for SSH
sudo ufw limit 22/tcp

# Reload
sudo systemctl reload ufw
```

## System Updates and Patching

### 1. Enable Automatic Security Updates

```bash
# Install unattended-upgrades
sudo apt-get install -y unattended-upgrades

# Enable it
sudo dpkg-reconfigure -plow unattended-upgrades

# Configure
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades

# Ensure these are uncommented:
# Unattended-Upgrade::AutoFixInterruptedDpkg "true";
# Unattended-Upgrade::MinimalSteps "true";
# Unattended-Upgrade::Mail "admin@gavior.in";
# Unattended-Upgrade::MailReport "on-change";
```

### 2. Regular Update Schedule

```bash
# Add to crontab for manual updates
crontab -e

# Add:
# Weekly system updates (Sunday 2 AM)
0 2 * * 0 sudo apt-get update && sudo apt-get upgrade -y

# Weekly security check
0 3 * * 0 sudo apt-get check
```

### 3. Check for Vulnerabilities

```bash
# Install and run security checks
sudo apt-get install -y apt-listchanges debian-goodies

# Check for known vulnerabilities
sudo debian-goodies-check

# Update npm for vulnerabilities
npm audit

# Fix if possible
npm audit fix
```

## Application Security

### 1. Environment Variables Security

```bash
# Never commit .env files
echo ".env*" >> .gitignore
git rm --cached .env 2>/dev/null

# Store secrets in:
# 1. GitHub Secrets (for CI/CD)
# 2. .env.local on EC2 (gitignored)
# 3. AWS Secrets Manager (optional, for other services)

# Verify no secrets are in code
git log -p | grep -i "password\|token\|secret\|api_key"

# Verify current files
grep -r "password\|token\|secret" src/ | grep -v "/node_modules/"
```

### 2. Node.js Dependencies Security

```bash
# Regular audit
npm audit

# Fix known vulnerabilities
npm audit fix

# Update to latest versions
npm update

# Remove unused dependencies
npm prune

# Check for deprecated packages
npm outdated
```

### 3. Application Hardening (Next.js)

```javascript
// In next.config.js, enable security headers
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

## SSL/TLS Security

### 1. Certificate Management

```bash
# Keep certificates up to date
sudo certbot certificates

# Verify certificates are auto-renewing
sudo systemctl status certbot.timer

# Test renewal process
sudo certbot renew --dry-run
```

### 2. SSL Configuration Hardening

```bash
# Verify Nginx SSL config
sudo nginx -t

# Check SSL Labs score
# https://www.ssllabs.com/ssltest/analyze.html?d=gavior.in

# Should be A or A+
# Nginx config already includes security settings via certbot
```

### 3. HSTS (HTTP Strict Transport Security)

```bash
# Already configured in nginx, verify:
sudo grep -r "Strict-Transport-Security" /etc/nginx/

# Should show: max-age=31536000; includeSubDomains
```

## Database Security (If Using)

```bash
# 1. Use environment variables for connection strings
export DATABASE_URL="postgresql://user:pass@host/db"

# 2. Never commit database passwords
echo ".env.local" >> .gitignore

# 3. Use connection pooling
# 4. Enable SSL for database connections
# 5. Regular backups
# 6. Encrypt backup storage
```

## Monitoring and Logging

### 1. Enable Security Logging

```bash
# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# System logs
sudo tail -f /var/log/syslog

# SSH login attempts
sudo tail -f /var/log/auth.log

# Check for suspicious login attempts
sudo grep "Failed password" /var/log/auth.log | tail -20
```

### 2. Application Logging

```bash
# Logs should include:
# - Failed authentication attempts
# - Authorization failures
# - Data access events
# - Configuration changes
# - Error conditions

# Review logs regularly
pm2 logs gavior | grep -i "error\|unauthorized\|forbidden"
```

### 3. Log Retention

```bash
# Configure log rotation
sudo nano /etc/logrotate.d/nginx

# Should include:
# /var/log/nginx/*.log {
#     daily
#     missingok
#     rotate 30
#     compress
#     delaycompress
#     notifempty
#     create 0640 www-data adm
#     sharedscripts
# }

# Apply
sudo logrotate -f /etc/logrotate.d/nginx
```

## Network Security

### 1. Disable Unnecessary Services

```bash
# List running services
sudo systemctl list-units --type=service --state=running

# Disable unnecessary ones
# sudo systemctl disable <service>
# sudo systemctl stop <service>
```

### 2. Configure Nginx Limits

```bash
# Already in nginx config:
# - limit_req_zone
# - limit_conn_zone
# - client_max_body_size

# Verify limits are set
sudo grep -r "limit_" /etc/nginx/sites-available/gavior

# Adjust if needed
```

### 3. DDoS Protection

```bash
# Use Nginx rate limiting (already configured)
# Consider Cloudflare for additional DDoS protection
# Monitor for abnormal traffic patterns

# Check connection statistics
netstat -an | awk '/tcp/ {print $6}' | sort | uniq -c | sort -rn
```

## Secrets Management

### 1. GitHub Secrets

```bash
# Store these in GitHub Secrets:
# - EC2_SSH_KEY: Private deploy key
# - Database credentials
# - API keys for external services
# - Encryption keys

# Rotate secrets every 90 days
# Audit secret access in GitHub logs
```

### 2. Secret Rotation

```bash
# For SSH keys:
1. Generate new key
2. Add to ~/.ssh/authorized_keys on EC2
3. Update GitHub secret
4. Test connection
5. Remove old key from authorized_keys

# For database credentials:
1. Create new user/password in database
2. Update .env.local
3. Restart application
4. Delete old user
```

### 3. Accidental Secret Exposure

If a secret is exposed:

```bash
# 1. Immediately revoke it
# 2. Generate new secret
# 3. Update in all locations
# 4. Update GitHub Secrets
# 5. Restart application
# 6. Audit logs for unauthorized access
# 7. Document incident

# Check git history for exposed secrets
git log --all --name-status -S 'password\|token\|secret'
```

## Compliance and Auditing

### 1. Regular Security Audit

Monthly security checklist:

```bash
# System
- [ ] All security updates applied
- [ ] No unnecessary services running
- [ ] Firewall rules reviewed
- [ ] SSH access logs reviewed

# Application
- [ ] npm audit passed
- [ ] No hardcoded secrets
- [ ] Dependencies updated
- [ ] Code review completed

# Infrastructure
- [ ] SSL certificate valid
- [ ] Backups verified
- [ ] Monitoring alerts working
- [ ] Access logs reviewed

# Documentation
- [ ] Runbooks updated
- [ ] Incident reports archived
- [ ] Changes documented
- [ ] Disaster recovery tested
```

### 2. Incident Response Plan

```markdown
# On Security Incident:

1. **Identify**: Detect and classify severity
2. **Contain**: Stop spread/damage
3. **Investigate**: Root cause analysis
4. **Remediate**: Fix vulnerability
5. **Verify**: Confirm fix works
6. **Communicate**: Notify stakeholders
7. **Document**: Post-mortem report
8. **Prevent**: Update policies/code
```

### 3. Security Documentation

Keep a security log:

```bash
# Create a file to track security events
cat > ~/security-log.md << 'EOF'
# Security Log

## 2024

### 2024-01-15: SSH Key Rotated
- Old key: ...abc123
- New key: ...xyz789
- Status: Verified and working

### 2024-02-01: npm audit
- Issues found: 2
- Resolved: npm audit fix
- Status: All dependencies secure

EOF

# Review monthly and keep updated
```

## External Security Services

### 1. Website Security Scanning

```bash
# Use free tools to scan for vulnerabilities
- https://www.ssllabs.com/ (SSL/TLS verification)
- https://www.cysecurity.org/ (vulnerability scanner)
- https://www.wapiti.projects.linuxfocus.org/ (web app scanner)
```

### 2. Uptime Monitoring

```bash
# Use monitoring service to detect downtime
- UptimeRobot
- Pingdom
- StatusCake
```

### 3. Log Aggregation

```bash
# Consider centralized logging for:
- Unauthorized access attempts
- Application errors
- Deployment events
- Configuration changes

# Services:
- Papertrail
- Datadog
- New Relic
```

## Security Hardening Checklist

- [ ] SSH access restricted to trusted IPs
- [ ] Password authentication disabled
- [ ] SSH keys use ED25519
- [ ] Firewall (UFW) enabled and configured
- [ ] Automatic security updates enabled
- [ ] Application dependencies audited
- [ ] No hardcoded secrets in code
- [ ] SSL certificates auto-renewing
- [ ] Security headers enabled
- [ ] Logging and monitoring configured
- [ ] Backups enabled and tested
- [ ] Incident response plan documented
- [ ] Security audit schedule established
- [ ] SSH keys rotated (last 90 days)
- [ ] Secrets rotated (last 90 days)

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Let's Encrypt Security](https://letsencrypt.org/docs/)
- [Nginx Security Tips](https://nginx.org/en/security_advisories.html)

See [PRODUCTION.md](PRODUCTION.md) for general production practices.
