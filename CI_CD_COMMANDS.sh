#!/bin/bash
# CI/CD Implementation Quick Reference Commands
# Copy and paste these commands step by step

# ============================================================================
# PHASE 1: LOCAL SETUP (Run on your local machine)
# ============================================================================

echo "PHASE 1: LOCAL SETUP"
echo "===================="

# Step 1: Verify Git
git status
git remote -v
git config user.email

# Step 2: Verify Node.js
node --version  # Should be 18+
npm --version   # Should be 9+

# Step 3: Install dependencies
npm install

# Step 4: Run linting
npm run lint

# Step 5: Build locally
npm run build

# Step 6: Clean up
rm -rf .next
rm -rf node_modules/.cache

# Step 7: Commit changes
git add .
git commit -m "feat: add email system and CI/CD setup"
git log --oneline -5


# ============================================================================
# PHASE 2: GITHUB CONFIGURATION (Do manually in GitHub web interface)
# ============================================================================

echo "PHASE 2: GITHUB CONFIGURATION"
echo "============================="
echo "Navigate to: GitHub.com → Your Repo → Settings → Secrets and variables"
echo ""
echo "Create these 6 secrets:"
echo "1. EC2_HOST = YOUR_EC2_PUBLIC_IP"
echo "2. EC2_USER = ubuntu"
echo "3. EC2_SSH_KEY = [Full private key content]"
echo "4. APP_DIRECTORY = /home/ubuntu/gaviorlanding"
echo "5. DOMAIN_NAME = gavior.in"
echo "6. EC2_KNOWN_HOSTS = [ssh-keyscan output]"
echo ""
echo "To get SSH key:"
cat ~/.ssh/your-key.pem  # Copy entire output
echo ""
echo "To get host key:"
ssh-keyscan -H YOUR_EC2_IP


# ============================================================================
# PHASE 3: EC2 VERIFICATION (SSH to your EC2 instance)
# ============================================================================

echo "PHASE 3: EC2 VERIFICATION"
echo "========================="

# Connect to EC2
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP

# Once connected, run these:
node --version
npm --version
pm2 --version
sudo systemctl status nginx
ls -la /home/ubuntu/gaviorlanding
cat ~/.ssh/authorized_keys

# Check deploy scripts executable
ls -la /home/ubuntu/gaviorlanding/deploy/
# If not executable:
chmod +x deploy/deploy-remote.sh deploy/bootstrap-ec2.sh

exit  # Exit EC2


# ============================================================================
# PHASE 4: PUSH AND TEST DEPLOYMENT
# ============================================================================

echo "PHASE 4: PUSH AND TEST DEPLOYMENT"
echo "=================================="

# Make test change
echo "# CI/CD Test" >> README.md

# Commit and push
git add README.md
git commit -m "test: trigger CI/CD pipeline"
git push origin main

# Monitor in browser:
# Go to: GitHub → Actions tab
# Watch the workflow run
# Should complete in 5-10 minutes


# ============================================================================
# PHASE 5: VERIFY WEBSITE AND TEST ROLLBACK
# ============================================================================

echo "PHASE 5: VERIFY WEBSITE"
echo "======================"

# Test website
curl -I https://gavior.in
# Expected: HTTP/2 200

# Test contact form
# Go to: https://gavior.in/contact
# Fill and submit form
# Check emails received


echo ""
echo "PHASE 6: TEST ROLLBACK"
echo "===================="

# Make a breaking change
# Edit src/app/page.tsx - break something intentionally

git add .
git commit -m "test: introduce breaking change"
git push origin main

# Watch GitHub Actions → Should fail and auto-rollback

# Verify website still works
curl -I https://gavior.in
# Expected: Still returns 200

# Fix the code
# Edit src/app/page.tsx back to working state

git add .
git commit -m "fix: restore broken code"
git push origin main

# Verify deploy succeeds


# ============================================================================
# USEFUL COMMANDS FOR ONGOING USE
# ============================================================================

echo ""
echo "USEFUL COMMANDS FOR ONGOING USE"
echo "==============================="

# Check SSH key access
ssh -i ~/.ssh/gavior-deploy-key ubuntu@YOUR_EC2_IP "echo 'SSH works'"

# View GitHub Actions logs
# GitHub → Actions → Latest workflow → Click each step

# SSH to EC2 and check status
ssh ubuntu@YOUR_EC2_IP "pm2 status"
ssh ubuntu@YOUR_EC2_IP "pm2 logs gavior --lines 50"

# Check disk space on EC2
ssh ubuntu@YOUR_EC2_IP "df -h"

# Check website
curl -I https://gavior.in

# Test contact form works
# Go to https://gavior.in/contact
# Submit form
# Check emails received at info@gavior.in and gaviorsupport@gmail.com

# View deployment history
git log --oneline --graph

# Manually trigger rollback
ssh ubuntu@YOUR_EC2_IP << 'EOF'
cd /home/ubuntu/gaviorlanding
git reset --hard HEAD~1
npm ci
npm run build
pm2 reload deploy/pm2/ecosystem.config.cjs --only gavior
pm2 save
EOF


# ============================================================================
# TROUBLESHOOTING COMMANDS
# ============================================================================

echo ""
echo "TROUBLESHOOTING"
echo "==============="

# If "Permission denied (publickey)":
# 1. Check EC2_SSH_KEY has full private key
# 2. Verify authorized_keys on EC2:
ssh ubuntu@YOUR_EC2_IP "cat ~/.ssh/authorized_keys | grep YOUR_KEY"
# 3. Check permissions:
ssh ubuntu@YOUR_EC2_IP "ls -la ~/.ssh"

# If build fails:
# Build locally first:
npm run lint
npm run build
# Fix any errors, then push

# If health check fails:
ssh ubuntu@YOUR_EC2_IP << 'EOF'
pm2 status
pm2 logs gavior --lines 100
curl -I http://127.0.0.1:3000/
EOF

# If emails not sending:
# Check SMTP config:
cat .env.local | grep SMTP
# Test API:
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","service":"Test","message":"Test"}'


# ============================================================================
# MONITORING & MAINTENANCE
# ============================================================================

echo ""
echo "DAILY/WEEKLY TASKS"
echo "=================="

# Daily: Check website
curl -I https://gavior.in

# Daily: Check PM2
ssh ubuntu@YOUR_EC2_IP "pm2 status"

# Weekly: Update system
ssh ubuntu@YOUR_EC2_IP "sudo apt-get update && sudo apt-get upgrade -y"

# Weekly: Check SSL certificate
ssh ubuntu@YOUR_EC2_IP "sudo certbot certificates"

# Monthly: Create backup
aws ec2 create-snapshot --volume-id vol-xxxxx --description "Gavior backup $(date)"

# After each deployment: Monitor logs
ssh ubuntu@YOUR_EC2_IP "pm2 logs gavior --lines 50"


# ============================================================================
# FULL SETUP QUICK START (All commands in sequence)
# ============================================================================

echo ""
echo "QUICK START - RUN ALL PHASES"
echo "============================"
echo ""
echo "# Local setup"
npm install
npm run lint
npm run build
git add .
git commit -m "feat: add email system and CI/CD setup"
git push origin main
echo "✅ Step 1 complete. Now go to GitHub and create 6 secrets..."
echo ""
echo "# After secrets created:"
echo "# Make test change"
echo "# git add README.md"
echo "# git commit -m 'test: trigger CI/CD'"
echo "# git push origin main"
echo ""
echo "# Monitor deployment in GitHub Actions"
echo "# Then verify: curl -I https://gavior.in"
echo "# Test form at https://gavior.in/contact"


# ============================================================================
# SUCCESS INDICATORS
# ============================================================================

echo ""
echo "SUCCESS CHECKLIST"
echo "================="
echo "✓ npm install completes"
echo "✓ npm run build succeeds"
echo "✓ GitHub Actions workflow runs"
echo "✓ SSH connection from GitHub Actions works"
echo "✓ Code deploys to EC2"
echo "✓ PM2 reloads successfully"
echo "✓ Website loads at https://gavior.in"
echo "✓ Contact form emails work"
echo "✓ Rollback works on failure"
echo "✓ Health check passes"
echo ""
echo "If all ✓, CI/CD is fully working!"
