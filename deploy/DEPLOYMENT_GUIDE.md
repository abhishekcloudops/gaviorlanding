# Complete Deployment Guide for Gavior

This guide covers the complete setup process for deploying Gavior to production on AWS EC2 with automated CI/CD.

## Prerequisites

- AWS account with EC2 access
- Ubuntu 24.04 LTS EC2 instance (t3.small or larger)
- Domain name (gavior.in) with DNS management access
- GitHub repository with Actions enabled
- SSH key pair for EC2 access

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Repository                        │
│                  (Push to main branch)                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              GitHub Actions Workflow                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 1. Checkout code                                     │  │
│  │ 2. Setup Node.js & npm                              │  │
│  │ 3. Install dependencies (npm ci)                    │  │
│  │ 4. Run linter (npm run lint)                        │  │
│  │ 5. Build locally (npm run build)                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                   │
│                         ▼ (if validation passes)            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Connect via SSH to EC2                              │  │
│  │ Pull latest code                                    │  │
│  │ Install production dependencies                     │  │
│  │ Build on server                                     │  │
│  │ Reload PM2 (graceful restart)                      │  │
│  │ Health check                                        │  │
│  │ Auto-rollback on failure                           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    EC2 Server                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Nginx (Reverse Proxy)                              │  │
│  │  ├─ Port 80 (HTTP → HTTPS redirect)                 │  │
│  │  └─ Port 443 (HTTPS with SSL)                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                   │
│  ┌──────────────────────▼──────────────────────────────┐  │
│  │  PM2 Cluster (2 Node.js instances)                  │  │
│  │  ├─ Instance 1 (Port 3000)                          │  │
│  │  └─ Instance 2 (Port 3000)                          │  │
│  │  Features:                                          │  │
│  │  ├─ Auto-restart on crash                           │  │
│  │  ├─ Memory limits (500MB per instance)              │  │
│  │  ├─ Graceful shutdown                               │  │
│  │  └─ Startup on system reboot                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                   │
│  ┌──────────────────────▼──────────────────────────────┐  │
│  │  Let's Encrypt SSL Certificates                     │  │
│  │  ├─ Auto-renewal via Certbot timer                  │  │
│  │  ├─ Valid for: gavior.in, www.gavior.in           │  │
│  │  └─ Auto-renewal verification                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Public Internet                          │
│               https://gavior.in                             │
└─────────────────────────────────────────────────────────────┘
```

## Step 1: Launch EC2 Instance

### 1.1 Create EC2 Instance

```bash
# Recommended specs
- AMI: Ubuntu 24.04 LTS (ami-0c55b159cbfafe1f0)
- Instance type: t3.small (minimum) or t3.medium (recommended)
- Storage: 30 GB gp3
- Security group: Create new with these rules:
  * SSH (22): Your IP only
  * HTTP (80): 0.0.0.0/0
  * HTTPS (443): 0.0.0.0/0
```

### 1.2 Create and configure security group

```bash
# Allow SSH from your IP (replace with your actual IP)
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxxxxxx \
  --protocol tcp \
  --port 22 \
  --cidr YOUR_IP/32

# Allow HTTP globally
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxxxxxx \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

# Allow HTTPS globally
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxxxxxx \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0
```

## Step 2: Configure DNS

### 2.1 Get EC2 Public IP

```bash
# From AWS Console or:
aws ec2 describe-instances \
  --instance-ids i-xxxxxxxxx \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text
```

### 2.2 Update DNS Records

Point these records to your EC2 public IP (using Hostinger or your DNS provider):

```
Record Type  | Name       | Value                | TTL
─────────────────────────────────────────────────────
A            | gavior.in  | YOUR_EC2_PUBLIC_IP   | 300
A            | www        | YOUR_EC2_PUBLIC_IP   | 300
```

### 2.3 Verify DNS Resolution

```bash
# Wait 5-10 minutes, then test:
nslookup gavior.in
nslookup www.gavior.in

# Should both resolve to your EC2 IP
```

## Step 3: Prepare EC2 Server

### 3.1 Clone Repository

```bash
# Connect to EC2
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# Clone repository
cd ~
git clone https://github.com/YOUR_USERNAME/gaviorlanding.git
cd gaviorlanding

# Make scripts executable
chmod +x deploy/bootstrap-ec2.sh deploy/deploy-remote.sh
```

### 3.2 Run Bootstrap Script

```bash
# Set environment variables
export APP_DIRECTORY=/home/ubuntu/gaviorlanding
export DOMAIN_NAME=gavior.in

# Run bootstrap (this will take 5-10 minutes)
bash deploy/bootstrap-ec2.sh

# The script will:
# ✅ Update system packages
# ✅ Install Node.js 22 LTS
# ✅ Install npm, PM2, Nginx, Certbot
# ✅ Configure UFW firewall
# ✅ Setup Nginx configuration
# ✅ Request SSL certificate from Let's Encrypt
# ✅ Install dependencies
# ✅ Build application
# ✅ Start PM2 cluster
# ✅ Enable PM2 startup on reboot
```

### 3.3 Verify Bootstrap Success

```bash
# Check if application is running
curl -I https://gavior.in

# Should return 200 OK

# Check PM2 status
pm2 status

# Should show 'gavior' with 2 instances running

# Check Nginx status
sudo systemctl status nginx

# Check SSL certificate
sudo certbot certificates
```

## Step 4: Create SSH Key for GitHub Actions

### 4.1 Generate Deploy Key

```bash
# On your local machine (or use existing EC2 key)
ssh-keygen -t ed25519 -f ~/gavior-deploy-key -N "" -C "gavior-deploy"

# Verify the key was created
ls -la ~/gavior-deploy-key*
```

### 4.2 Get SSH Host Key

```bash
# Run this on your local machine
ssh-keyscan -H YOUR_EC2_PUBLIC_IP >> ~/.ssh/known_hosts

# Copy the output (you'll need this for GitHub)
ssh-keyscan -H YOUR_EC2_PUBLIC_IP
```

### 4.3 Add Deploy Key to EC2

```bash
# Connect to EC2
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# Add your deploy public key to authorized_keys
cat >> ~/.ssh/authorized_keys << 'EOF'
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIxxxx... gavior-deploy
EOF

chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh

# Verify (from your local machine)
ssh -i ~/gavior-deploy-key ubuntu@YOUR_EC2_PUBLIC_IP "echo 'Success!'"
```

## Step 5: Configure GitHub Secrets

### 5.1 Add Repository Secrets

In GitHub repository settings → Secrets and variables → Actions → Repository secrets:

| Secret Name | Value |
|---|---|
| `EC2_HOST` | YOUR_EC2_PUBLIC_IP (e.g., 54.123.45.67) |
| `EC2_USER` | ubuntu |
| `EC2_SSH_KEY` | (paste entire private key from ~/gavior-deploy-key) |
| `APP_DIRECTORY` | /home/ubuntu/gaviorlanding |
| `DOMAIN_NAME` | gavior.in |
| `EC2_KNOWN_HOSTS` | (paste output from ssh-keyscan) |

### 5.2 Create Production Environment

1. Go to GitHub → Settings → Environments
2. Click "New environment" → Name: `production`
3. Add deployment branches rule: `main`
4. (Optional) Add required reviewers for additional safety

### 5.3 Verify Secrets

```bash
# On your local machine, test the SSH connection:
ssh -i ~/gavior-deploy-key ubuntu@YOUR_EC2_PUBLIC_IP "pm2 status"

# Should show the PM2 cluster running
```

## Step 6: Test Deployment Pipeline

### 6.1 Make a Test Commit

```bash
# In your local repository
git checkout main
echo "# Test deployment" >> README.md
git add README.md
git commit -m "test: trigger deployment workflow"
git push origin main
```

### 6.2 Monitor Workflow

1. Go to GitHub → Actions
2. Watch the "Build and Deploy to EC2" workflow
3. Each step shows real-time output

### 6.3 Verify Production Deployment

```bash
# After workflow completes
curl -I https://gavior.in

# Should return 200 OK

# Check logs on EC2
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
pm2 logs gavior --lines 50
pm2 monit  # Real-time monitoring
```

## Step 7: Post-Deployment Verification

### 7.1 Test HTTPS

```bash
# From your local machine
curl -v https://gavior.in

# Should show:
# - HTTP/2 200 (or 301 redirect)
# - Valid SSL certificate for gavior.in
# - Security headers present
```

### 7.2 Check Certificate

```bash
# SSH to EC2
ssh ubuntu@YOUR_EC2_PUBLIC_IP

# View certificate details
sudo certbot certificates

# Should show:
# - Certificate for gavior.in, www.gavior.in
# - Expiry date (typically 90 days from issue)
# - Auto-renewal enabled
```

### 7.3 Test Auto-Renewal

```bash
# Dry run (doesn't renew, just checks if it would work)
sudo certbot renew --dry-run

# Should complete without errors
```

### 7.4 Monitor Application

```bash
# Check process status
pm2 status

# View logs
pm2 logs gavior

# Real-time monitoring
pm2 monit

# Detailed process info
pm2 describe gavior

# Save the current PM2 setup (for persistence)
pm2 save
```

## Ongoing Maintenance

### Daily Checks

```bash
# SSH to server
ssh ubuntu@YOUR_EC2_PUBLIC_IP

# Check status
pm2 status
pm2 logs gavior --lines 20

# Check disk space
df -h

# Check memory
free -h
```

### Weekly Checks

```bash
# Update system packages
sudo apt-get update && sudo apt-get upgrade -y

# Check SSL certificate renewal
sudo certbot renew --dry-run

# Review Nginx logs
sudo tail -n 50 /var/log/nginx/access.log
sudo tail -n 50 /var/log/nginx/error.log
```

### Monthly Tasks

```bash
# Create EC2 snapshot (backup)
aws ec2 create-snapshot --volume-id vol-xxxxx \
  --description "Gavior production backup - $(date +%Y-%m-%d)"

# Rotate SSH keys if needed
# Review security group rules
# Update GitHub Actions secrets if keys are rotated
```

## Troubleshooting Deployment

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.

## Rollback Procedures

See [ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md) for manual rollback procedures.

## Security Hardening

See [SECURITY_BEST_PRACTICES.md](SECURITY_BEST_PRACTICES.md) for additional security recommendations.

## Monitoring and Alerts

See [MONITORING_GUIDE.md](MONITORING_GUIDE.md) for comprehensive monitoring setup.
