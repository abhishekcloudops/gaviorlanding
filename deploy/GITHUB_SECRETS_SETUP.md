# GitHub Secrets Configuration Guide

This guide walks through setting up all required GitHub Secrets for the deployment workflow.

## Overview

The deployment workflow requires 6 secrets to connect to your EC2 instance and authenticate git operations:

1. `EC2_HOST` - EC2 public IP address
2. `EC2_USER` - SSH user (always `ubuntu` for Ubuntu AMI)
3. `EC2_SSH_KEY` - Private SSH key for authentication
4. `APP_DIRECTORY` - Application path on server (`/home/ubuntu/gaviorlanding`)
5. `DOMAIN_NAME` - Primary domain (`gavior.in`)
6. `EC2_KNOWN_HOSTS` - SSH host key fingerprint for security

## Step 1: Create SSH Key Pair for Deployment

### Option A: Create New Deploy Key

```bash
# On your local machine
cd ~/.ssh

# Generate ED25519 key (recommended for security)
ssh-keygen -t ed25519 -f gavior-deploy-key -N "" \
  -C "gavior-github-actions"

# Verify it was created
ls -la gavior-deploy-key*

# You now have:
# - gavior-deploy-key (private key - for GitHub)
# - gavior-deploy-key.pub (public key - for EC2)
```

### Option B: Use Existing Key

If you have an existing EC2 key pair, you can use that:

```bash
# List your keys
ls -la ~/.ssh/

# Choose the one you use for EC2 SSH
# Typically: ec2-key.pem or similar
```

## Step 2: Add Public Key to EC2

### If Using New Key:

```bash
# 1. Copy public key to EC2
ssh-copy-id -i ~/.ssh/gavior-deploy-key.pub ubuntu@YOUR_EC2_PUBLIC_IP

# Or manually:
# Copy the public key content
cat ~/.ssh/gavior-deploy-key.pub

# Connect to EC2
ssh -i your-regular-ec2-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# Paste into authorized_keys
mkdir -p ~/.ssh
cat >> ~/.ssh/authorized_keys << 'EOF'
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIxxxx... gavior-github-actions
EOF

chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh

# Test from local machine
ssh -i ~/.ssh/gavior-deploy-key ubuntu@YOUR_EC2_PUBLIC_IP "echo 'Success!'"
```

## Step 3: Get EC2 Host Key Fingerprint

This ensures you're connecting to the right server (security best practice).

```bash
# Run this on your local machine
ssh-keyscan -H YOUR_EC2_PUBLIC_IP

# Example output:
# # YOUR_EC2_PUBLIC_IP SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.1
# YOUR_EC2_PUBLIC_IP ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBB...
# YOUR_EC2_PUBLIC_IP ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCxxx...
# YOUR_EC2_PUBLIC_IP ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIyyy...

# You need to copy this ENTIRE output (all 3 lines)
```

**Optional**: Verify the fingerprint before using it

```bash
# On EC2 server
sudo ssh-keyscan -H localhost

# Compare with what ssh-keyscan from your machine returns
# They should match
```

## Step 4: Gather EC2 Information

```bash
# From AWS Console, get:
1. EC2_HOST: Public IPv4 address (e.g., 54.123.45.67)
   - Or hostname (e.g., ec2-54-123-45-67.compute-1.amazonaws.com)

2. EC2_USER: ubuntu (for Ubuntu AMI)

3. APP_DIRECTORY: /home/ubuntu/gaviorlanding
   - Or wherever you cloned the repo

4. DOMAIN_NAME: gavior.in

# Verify SSH works
ssh -i ~/.ssh/gavior-deploy-key ubuntu@YOUR_EC2_PUBLIC_IP "echo 'Test'"
# Should print "Test"
```

## Step 5: Add Secrets to GitHub

### Method 1: GitHub Web UI (Recommended)

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. Click **Secrets and variables** (left sidebar)
4. Click **Actions** (if not already selected)
5. Click **New repository secret**

### Method 2: GitHub CLI

```bash
# Install GitHub CLI if not already installed
# https://cli.github.com/

# Login to GitHub
gh auth login

# Add secrets
gh secret set EC2_HOST -b "YOUR_EC2_PUBLIC_IP"
gh secret set EC2_USER -b "ubuntu"
gh secret set APP_DIRECTORY -b "/home/ubuntu/gaviorlanding"
gh secret set DOMAIN_NAME -b "gavior.in"

# For private key and known_hosts, use file input
gh secret set EC2_SSH_KEY < ~/.ssh/gavior-deploy-key
gh secret set EC2_KNOWN_HOSTS < ec2-host-key.txt  # From step 3
```

## Step 6: Add Each Secret

### Secret 1: EC2_HOST

```
Name: EC2_HOST
Value: 54.123.45.67  (or your EC2 public IP/hostname)
```

Click **Add secret**

### Secret 2: EC2_USER

```
Name: EC2_USER
Value: ubuntu
```

Click **Add secret**

### Secret 3: EC2_SSH_KEY

This is your PRIVATE KEY. Be very careful!

```
Name: EC2_SSH_KEY
Value: (paste entire content of ~/.ssh/gavior-deploy-key)
```

**To get the private key content:**

```bash
# Display without accidentally copying terminal chrome
cat ~/.ssh/gavior-deploy-key

# Or copy to clipboard (macOS)
cat ~/.ssh/gavior-deploy-key | pbcopy

# Or copy to clipboard (Linux)
cat ~/.ssh/gavior-deploy-key | xclip -selection clipboard
```

The content looks like:

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUtbm9uZQAAAAAwAAAAC2VkMjU1MTkAAAAgOXxxx
...many lines...
-----END OPENSSH PRIVATE KEY-----
```

Paste the entire thing into GitHub.

Click **Add secret**

### Secret 4: APP_DIRECTORY

```
Name: APP_DIRECTORY
Value: /home/ubuntu/gaviorlanding
```

(Or wherever you cloned the repository on EC2)

Click **Add secret**

### Secret 5: DOMAIN_NAME

```
Name: DOMAIN_NAME
Value: gavior.in
```

Click **Add secret**

### Secret 6: EC2_KNOWN_HOSTS

This is the output from `ssh-keyscan`.

```
Name: EC2_KNOWN_HOSTS
Value: (paste output from ssh-keyscan -H YOUR_EC2_PUBLIC_IP)
```

The content looks like:

```
# YOUR_EC2_PUBLIC_IP SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.1
YOUR_EC2_PUBLIC_IP ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBxxx
YOUR_EC2_PUBLIC_IP ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCxxx
YOUR_EC2_PUBLIC_IP ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIyyy
```

Paste all of it into GitHub.

Click **Add secret**

## Step 7: Verify Secrets

### List Secrets via CLI

```bash
gh secret list
```

Output should show all 6 secrets (values are redacted):

```
EC2_HOST                  Updated 2024-01-15
EC2_USER                  Updated 2024-01-15
EC2_SSH_KEY               Updated 2024-01-15
APP_DIRECTORY             Updated 2024-01-15
DOMAIN_NAME               Updated 2024-01-15
EC2_KNOWN_HOSTS           Updated 2024-01-15
```

### Test Workflow

1. Go to **Actions** tab in GitHub
2. Click **Build and Deploy to EC2** workflow
3. Click **Run workflow** button
4. Select branch: `main`
5. Click **Run workflow**

The workflow will:
- Checkout code
- Run lint and build tests
- Test SSH connection to EC2
- Show all configured secrets are present

If this passes, all secrets are correctly configured!

## Step 8: (Optional) Create Production Environment

For additional safety, create a GitHub Environment:

1. Go to **Settings** → **Environments**
2. Click **New environment**
3. Name: `production`
4. (Optional) Add deployment protection rules:
   - Required reviewers: Your team members
   - Deployment branches: `main` only
5. Add the same 6 secrets to this environment

Then update `.github/workflows/deploy.yml` to require this environment:

```yaml
deploy:
  environment: production  # This line
  runs-on: ubuntu-latest
  ...
```

## Security Best Practices

### Private Key Security

- ✅ Store private key in GitHub Secrets (encrypted)
- ✅ Never commit private key to git
- ✅ Rotate private key every 90 days
- ❌ Don't store private key in plain text files
- ❌ Don't share private key via email/Slack
- ❌ Don't use production key for local testing

### Secret Rotation Schedule

```
Day 1: Create new key pair
Day 2: Add public key to EC2
Day 3: Update GitHub Secret
Day 4: Test connection
Day 5: Remove old key from EC2
```

### Audit Trail

Check who accessed secrets:

1. Go to **Settings** → **Audit log**
2. Search for "secret" or "Secret"
3. Review all changes to secrets

## Troubleshooting

### "Permission denied (publickey)"

The private key isn't being used correctly.

```bash
# Debug
ssh -v -i ~/.ssh/gavior-deploy-key ubuntu@YOUR_EC2_PUBLIC_IP

# Check:
1. Private key has correct permissions: chmod 600
2. Public key is in EC2 ~/.ssh/authorized_keys
3. EC2 security group allows port 22
4. SSH key format is correct (PEM or OpenSSH)
```

### "Host key verification failed"

The `EC2_KNOWN_HOSTS` secret is wrong.

```bash
# Regenerate
ssh-keyscan -H YOUR_EC2_PUBLIC_IP > ec2-host-key.txt

# Update GitHub secret with the new content
```

### "No authentication methods available"

The key path or format is wrong.

```bash
# Verify key is valid
ssh-keygen -l -f ~/.ssh/gavior-deploy-key

# Verify key is added to authorized_keys on EC2
ssh -i your-regular-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
cat ~/.ssh/authorized_keys
```

## What Each Secret Is Used For

```yaml
# .github/workflows/deploy.yml uses:

- EC2_HOST       # ssh ubuntu@${{ secrets.EC2_HOST }}
- EC2_USER       # ${{ secrets.EC2_USER }}@${{ secrets.EC2_HOST }}
- EC2_SSH_KEY    # Identity file for SSH authentication
- APP_DIRECTORY  # Path for `cd ${{ secrets.APP_DIRECTORY }}`
- DOMAIN_NAME    # Passed to deployment script
- EC2_KNOWN_HOSTS # StrictHostKeyChecking validation
```

## Cleanup and Rotation

### To Rotate Secrets

```bash
# Generate new key
ssh-keygen -t ed25519 -f ~/.ssh/gavior-deploy-new -N "" \
  -C "gavior-github-actions-rotated"

# Add new public key to EC2
ssh-copy-id -i ~/.ssh/gavior-deploy-new.pub ubuntu@YOUR_EC2_PUBLIC_IP

# Update GitHub secret
gh secret set EC2_SSH_KEY < ~/.ssh/gavior-deploy-new

# Test
gh workflow run deploy.yml --ref main

# After confirming it works
# Remove old public key from EC2
ssh ubuntu@YOUR_EC2_PUBLIC_IP
  # Edit ~/.ssh/authorized_keys and remove old key
  nano ~/.ssh/authorized_keys

# Safely delete old key
shred -vfz -n 3 ~/.ssh/gavior-deploy-key
rm ~/.ssh/gavior-deploy-key.pub
```

### To Revoke Secrets

If you suspect a secret was compromised:

```bash
# 1. Immediately delete from GitHub
gh secret delete EC2_SSH_KEY

# 2. Remove public key from EC2
ssh ubuntu@YOUR_EC2_PUBLIC_IP
  # Edit ~/.ssh/authorized_keys, remove the key
  nano ~/.ssh/authorized_keys

# 3. Generate new secret
ssh-keygen -t ed25519 -f ~/.ssh/gavior-deploy-key-new -N "" \
  -C "gavior-github-actions-emergency"

# 4. Add to EC2
ssh-copy-id -i ~/.ssh/gavior-deploy-key-new.pub ubuntu@YOUR_EC2_PUBLIC_IP

# 5. Add new secret to GitHub
gh secret set EC2_SSH_KEY < ~/.ssh/gavior-deploy-key-new

# 6. Verify
gh workflow run deploy.yml --ref main

# 7. Delete old key securely
shred -vfz ~/.ssh/gavior-deploy-key
```

## Related Documentation

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete setup guide
- [SECURITY_BEST_PRACTICES.md](SECURITY_BEST_PRACTICES.md) - Security hardening
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) - Workflow definition
