# Rollback Guide for Gavior

This guide provides procedures for rolling back deployments when issues are detected.

## Automatic Rollback

The GitHub Actions workflow includes automatic rollback. If deployment fails:

1. The application health check will fail (5 attempts at 2-second intervals)
2. The remote deploy script triggers the rollback trap
3. Previous Git revision is restored
4. Dependencies are reinstalled
5. Application is rebuilt
6. PM2 is reloaded with the previous version
7. Deployment fails and you're notified

**No manual action required** if auto-rollback succeeds.

## Manual Rollback Procedures

### Quick Rollback (Last Known Good)

If you need to quickly rollback to the previous commit:

```bash
# SSH to EC2
ssh ubuntu@YOUR_EC2_PUBLIC_IP

# Get the current commit hash
cd /home/ubuntu/gaviorlanding
git log --oneline -n 5

# Rollback to previous commit (replace with actual commit hash)
git reset --hard abc1234def

# Reinstall and rebuild
npm ci --no-audit --no-fund
npm run build

# Reload PM2
pm2 reload deploy/pm2/ecosystem.config.cjs --only gavior --update-env
pm2 save

# Verify health
curl -I http://127.0.0.1:3000/
```

### Specific Commit Rollback

Rollback to a specific known-good commit:

```bash
# SSH to EC2
cd /home/ubuntu/gaviorlanding

# List available commits
git log --oneline

# Example output:
# abc1234 (HEAD) fix: latest bug
# def5678 feat: new feature
# ghi9012 fix: previous working version
# ...

# Rollback to specific commit (e.g., ghi9012)
git reset --hard ghi9012

# Reinstall and rebuild
npm ci --no-audit --no-fund --save-exact
npm run build

# Verify all packages are installed correctly
npm list

# Reload PM2
pm2 reload deploy/pm2/ecosystem.config.cjs --only gavior --update-env
pm2 save

# Verify application
sleep 2
curl -v http://127.0.0.1:3000/
curl -I https://gavior.in/
```

### Partial Rollback (Just Code, Keep Dependencies)

Use this if you want to keep current dependencies but revert code:

```bash
# SSH to EC2
cd /home/ubuntu/gaviorlanding

# Stash current changes if any
git stash

# Rollback to previous version
git reset --hard HEAD~1

# Don't reinstall dependencies, just rebuild
npm run build

# Reload PM2
pm2 reload deploy/pm2/ecosystem.config.cjs --only gavior --update-env

# Verify
curl -I http://127.0.0.1:3000/
```

## Rollback from Database/Storage Issues

If rollback failed due to database issues:

```bash
# SSH to EC2
cd /home/ubuntu/gaviorlanding

# Stop the application
pm2 stop gavior

# Check what changed
git diff HEAD~1 HEAD -- "**db**" "**sql**" "**migrations**"

# If database migrations ran, you may need to:
# 1. Restore database from backup (if available)
# 2. Or manually run rollback migrations
# 3. Then restart the application

# For now, restart the app
pm2 restart gavior

# Monitor for issues
pm2 logs gavior --lines 100
```

## Zero-Downtime Rollback Strategy

The deployment uses PM2's graceful reload feature for zero-downtime updates:

```bash
# Current setup (what happens during normal deploy)
pm2 reload deploy/pm2/ecosystem.config.cjs --only gavior --update-env

# This:
# 1. Keeps old instances alive serving requests
# 2. Starts new instances with updated code
# 3. Transfers new traffic to new instances
# 4. Gracefully shuts down old instances
# 5. No requests are dropped
```

For zero-downtime rollback:

```bash
# Simply re-deploy the previous version
git reset --hard HEAD~1
npm run build
pm2 reload deploy/pm2/ecosystem.config.cjs --only gavior --update-env
```

## Rollback Decision Tree

```
Deployment Failed
        │
        ├─→ Did auto-rollback succeed?
        │   ├─→ YES: Check logs, investigate root cause
        │   └─→ NO: Go to Manual Rollback
        │
        └─→ Application issues detected post-deploy?
            ├─→ Performance issues?
            │   └─→ Use Partial Rollback
            │
            ├─→ Critical errors?
            │   └─→ Use Quick Rollback
            │
            └─→ Data/Database issues?
                └─→ Use Database Rollback procedure
```

## Testing Rollback (Practice)

Regularly test rollback procedures to ensure they work:

```bash
# On a non-production testing instance

# 1. Deploy current version
git fetch origin
git reset --hard origin/main
npm ci
npm run build
pm2 start deploy/pm2/ecosystem.config.cjs --only gavior

# 2. Verify it works
curl -I http://127.0.0.1:3000/

# 3. Make a change (or just rollback)
git reset --hard HEAD~1
npm ci
npm run build

# 4. Verify rollback
curl -I http://127.0.0.1:3000/

# 5. Check logs
pm2 logs gavior --lines 20

# If all works: Great! Your rollback procedure is solid.
```

## Communicating Rollbacks

When you rollback in production:

1. **Immediately** notify your team:
   ```
   ⚠️ INCIDENT: Rolled back to [commit-hash] at [timestamp]
   Reason: [brief reason]
   Impact: [user impact]
   Next steps: [what you're doing to investigate]
   ```

2. **Document** the incident:
   - What failed
   - Why it failed
   - What was rolled back
   - Resolution time
   - What was learned

3. **Create ticket** to fix the root cause
   - Don't let the same issue happen twice
   - Update deployment checklist if needed

## Rollback Checklist

After any rollback:

- [ ] Health check passes: `curl https://gavior.in`
- [ ] Application responds: `curl -I https://gavior.in`
- [ ] No errors in logs: `pm2 logs gavior --lines 50`
- [ ] Response time is normal
- [ ] Database data is consistent
- [ ] External integrations work
- [ ] SSL certificate is valid
- [ ] All team members notified
- [ ] Root cause identified
- [ ] Fix created as a new issue/PR

## Rollback Monitoring

Monitor these metrics after rollback:

```bash
# Real-time monitoring
pm2 monit

# Application logs
pm2 logs gavior

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log

# System resources
watch -n 1 "free -h && df -h && uptime"
```

## Recovery Procedures

### If Rollback Fails

```bash
# 1. Emergency stop
pm2 stop gavior

# 2. Check what's wrong
pm2 logs gavior --lines 200
git status
npm list

# 3. Manually fix issues
# (edit files, install packages, etc.)

# 4. Restart
pm2 start deploy/pm2/ecosystem.config.cjs --only gavior
pm2 save

# 5. Monitor
pm2 logs gavior
```

### If Database is Corrupted

```bash
# 1. Restore from backup (if available)
# (This depends on your database setup)

# 2. If no backup, rebuild from scratch
pm2 stop gavior
# ... restore database ...
pm2 start gavior

# 3. Run database verification
npm run db:verify  # If this script exists
```

### If You Can't Connect via SSH

```bash
# Use AWS Systems Manager Session Manager
aws ssm start-session --target i-xxxxxxxxx

# Or create an EC2 Image and launch a new instance
aws ec2 create-image --instance-id i-xxxxxxxxx --name gavior-backup-$(date +%s)
```

## Prevention is Better Than Recovery

To minimize the need for rollbacks:

1. **Test before pushing**: Run `npm run lint && npm run build` locally
2. **Use feature branches**: PR reviews catch issues before main
3. **Automated testing**: Expand test coverage
4. **Staged rollout**: Deploy to staging first
5. **Health checks**: Monitor immediately after deploy
6. **Alerts**: Get notified of issues quickly

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for pre-deployment checks.
