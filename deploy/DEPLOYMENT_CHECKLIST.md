# Pre-Deployment Checklist for Gavior

Use this checklist before pushing code to the main branch for production deployment.

## Code Quality (Before Commit)

- [ ] **Linting passes**: `npm run lint`
- [ ] **Build succeeds locally**: `npm run build`
- [ ] **No console errors**: Check browser console
- [ ] **No console warnings**: `grep -r "console.warn\|console.error" src/`
- [ ] **Tests pass** (if applicable): `npm test`
- [ ] **No hardcoded secrets**: `grep -r "password\|token\|secret" src/`
- [ ] **No TODO comments**: `grep -r "TODO\|FIXME" src/ | wc -l`
- [ ] **Code reviewed**: PR approved by at least one reviewer
- [ ] **Accessibility checked**: ARIA labels, keyboard navigation
- [ ] **Mobile responsive tested**: Chrome DevTools mobile view
- [ ] **Dark mode tested** (if supported): Works in both themes

## Dependencies

- [ ] **npm audit clean**: `npm audit` shows no vulnerabilities
- [ ] **npm ci works**: `npm ci` succeeds
- [ ] **No deprecated packages**: `npm outdated` is empty
- [ ] **Lock file committed**: `package-lock.json` is up to date
- [ ] **Node version correct**: Using Node.js 22 LTS

## Environment and Configuration

- [ ] **.env variables documented**: All required vars listed
- [ ] **.env.local not committed**: In .gitignore
- [ ] **No environment-specific code**: No hardcoded IPs/hosts
- [ ] **Error handling present**: Try-catch blocks where needed
- [ ] **Logging implemented**: Important events are logged
- [ ] **Rate limiting considered**: For API endpoints if applicable

## Performance

- [ ] **Bundle size checked**: `npm run build` shows size
- [ ] **Images optimized**: No large uncompressed images
- [ ] **Database queries efficient** (if applicable): No N+1 queries
- [ ] **API response times acceptable**: < 1 second
- [ ] **Static assets cacheable**: Proper cache headers

## Security

- [ ] **HTTPS only**: No HTTP endpoints
- [ ] **Security headers present**: See SECURITY_BEST_PRACTICES.md
- [ ] **Input validation**: All user input validated
- [ ] **XSS prevention**: User input escaped
- [ ] **CSRF protection**: If applicable, tokens present
- [ ] **SQL injection prevention**: If using database, parameterized queries
- [ ] **Secrets not exposed**: No API keys in frontend code
- [ ] **Dependencies audited**: `npm audit`

## Testing on Staging (If Available)

- [ ] **Deployed to staging successfully**
- [ ] **All features working on staging**
- [ ] **Performance acceptable on staging**
- [ ] **SSL certificate valid on staging**
- [ ] **Database queries working**
- [ ] **Third-party integrations working**
- [ ] **Email delivery working** (if applicable)
- [ ] **Analytics tracking working**

## Infrastructure Readiness

- [ ] **EC2 instance healthy**:
  ```bash
  ssh ubuntu@${{ secrets.EC2_HOST }}
  pm2 status  # All green
  df -h       # Disk > 20% free
  free -h     # Memory healthy
  ```

- [ ] **Nginx configured**: `sudo nginx -t` passes
- [ ] **SSL certificate valid**: Expires > 30 days
- [ ] **Firewall rules correct**: UFW allows 22, 80, 443 only
- [ ] **SSH key accessible**: Can connect to EC2

## GitHub Actions Setup

- [ ] **All secrets configured**:
  - [ ] `EC2_HOST`
  - [ ] `EC2_USER`
  - [ ] `EC2_SSH_KEY`
  - [ ] `APP_DIRECTORY`
  - [ ] `DOMAIN_NAME`
  - [ ] `EC2_KNOWN_HOSTS`

- [ ] **Workflow file exists**: `.github/workflows/deploy.yml`
- [ ] **Workflow passes for main branch**: Run manually to test
- [ ] **SSH connection test passes**: Workflow can connect to EC2
- [ ] **Build succeeds in GitHub Actions**: Workflow builds successfully

## Documentation

- [ ] **CHANGELOG updated**: Document what changed
- [ ] **README updated**: If new features added
- [ ] **API docs updated** (if applicable): New endpoints documented
- [ ] **Deployment notes written**: Any special considerations
- [ ] **Known issues documented**: If deploying with known issues
- [ ] **Rollback plan documented**: How to rollback if needed

## Communication

- [ ] **Team notified**: Stakeholders know deployment is coming
- [ ] **Maintenance window communicated**: If downtime required
- [ ] **Contact person assigned**: Who's on call if issues
- [ ] **Monitoring alerts verified**: Alerts reach right people
- [ ] **Incident response plan reviewed**: Everyone knows procedure

## Monitoring Setup

- [ ] **Application monitoring active**: PM2, alerts working
- [ ] **Nginx monitoring active**: Traffic monitoring set up
- [ ] **SSL monitoring active**: Certificate expiry alerts
- [ ] **System monitoring active**: Disk/memory/CPU alerts
- [ ] **Log aggregation working**: Logs being collected
- [ ] **Uptime monitoring enabled**: External monitoring active

## Pre-Deployment Final Check (Within 1 Hour of Deploy)

```bash
# Local checks
npm run lint              # ✅ No errors
npm run build             # ✅ Build succeeds
npm audit                 # ✅ No vulnerabilities
git status                # ✅ Only intended changes
git log --oneline -n 5    # ✅ Commits look good

# EC2 checks (from your machine)
ssh -i deploy_key ubuntu@$EC2_HOST
  pm2 status              # ✅ Running
  df -h                   # ✅ Disk OK
  free -h                 # ✅ Memory OK
  sudo nginx -t           # ✅ Config OK
  sudo systemctl status nginx  # ✅ Running

# DNS checks
nslookup gavior.in        # ✅ Resolves correctly
nslookup www.gavior.in    # ✅ Resolves correctly

# SSL checks
curl -I https://gavior.in # ✅ Certificate valid

# Final verification
curl https://gavior.in    # ✅ Content loads
```

## During Deployment

Monitor these in real-time:

```bash
# Terminal 1: GitHub Actions workflow
# Watch the workflow in GitHub Actions tab
# Verify each step completes successfully

# Terminal 2: SSH to server and watch logs
ssh ubuntu@${{ secrets.EC2_HOST }}
pm2 logs gavior

# Terminal 3: Monitor resources
watch -n 1 "pm2 describe gavior | grep -E 'status|memory|cpu'"

# Terminal 4: Test endpoint
watch -n 2 "curl -I https://gavior.in"
```

## Post-Deployment Verification (Immediately After)

- [ ] **Workflow completed successfully**: Green checkmarks in GitHub
- [ ] **No errors in PM2 logs**: `pm2 logs gavior --lines 50`
- [ ] **Application responding**: `curl https://gavior.in/` returns 200
- [ ] **No 502 errors**: Nginx is proxying correctly
- [ ] **SSL certificate valid**: `curl -I https://gavior.in` shows valid cert
- [ ] **Response time acceptable**: < 2 seconds
- [ ] **All pages load**: Test multiple pages
- [ ] **Functionality works**: Test key features
- [ ] **Database accessible** (if applicable): Queries work
- [ ] **Third-party services working**: APIs accessible
- [ ] **Email working** (if applicable): Test email
- [ ] **Analytics updated**: New deployment in analytics
- [ ] **No errors in browser console**: F12 → Console

## Post-Deployment Monitoring (First Hour)

Monitor these metrics for the first hour:

```bash
# Every 5 minutes:
- [ ] HTTP status codes: 2xx, 3xx, 4xx, 5xx distribution
- [ ] Response times: P50, P95, P99
- [ ] Error rates: < 1%
- [ ] Memory usage: Stable, no memory leak
- [ ] CPU usage: < 80%
- [ ] Disk usage: Stable

# Check logs for:
- [ ] No deployment errors
- [ ] No permission errors
- [ ] No database connection errors
- [ ] No timeout errors
```

## Post-Deployment Monitoring (First Day)

- [ ] **No critical errors**: Review logs for 24 hours
- [ ] **Performance stable**: Response times consistent
- [ ] **No memory leaks**: Memory usage stable over time
- [ ] **SSL renewal working**: Certificate auto-renewal configured
- [ ] **Backups working**: Daily backup completed

## If Deployment Fails

1. **Immediately stop the workflow**: Click cancel in GitHub Actions
2. **Check the error**: Review the failed step's output
3. **SSH to server**: `ssh ubuntu@${{ secrets.EC2_HOST }}`
4. **Check status**: `pm2 status` and `pm2 logs gavior`
5. **Consider rollback**: See [ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md)
6. **Notify team**: Post in team chat/Slack
7. **Fix the issue**: Identify root cause
8. **Document**: Create issue for fix
9. **Retry**: Push fix and retry deployment

## Post-Incident (If Issues Occurred)

- [ ] **Root cause identified**: Why did it fail?
- [ ] **Fix implemented**: Code changed to prevent recurrence
- [ ] **Checklist updated**: Add check to prevent this again
- [ ] **Team informed**: Knowledge shared
- [ ] **Incident documented**: For future reference
- [ ] **Automation improved**: Can we catch this before deploy?

## Deployment Frequency Recommendations

- **Low risk changes**: Can deploy anytime
  - Documentation updates
  - Minor UI tweaks
  - Dependency upgrades
  - Performance optimizations

- **Medium risk changes**: Deploy during business hours
  - Feature additions
  - Database schema changes
  - Major refactoring

- **High risk changes**: Coordinate with team
  - Security patches
  - Payment system changes
  - Authentication system changes

## Quick Reference Commands

```bash
# Check if safe to deploy
npm run lint && npm run build && npm audit

# Connect to server
ssh -i ~/.ssh/deploy_key ubuntu://YOUR_EC2_PUBLIC_IP

# View deployment status
cd /home/ubuntu/gaviorlanding
pm2 status
pm2 logs gavior --lines 50

# Check system health
df -h && free -h && top -b -n 1

# Verify HTTPS
curl -I https://gavior.in

# Monitor in real-time
pm2 monit

# View recent deployments
git log --oneline -n 20 --author="github-actions"
```

## Checklist Customization

Feel free to customize this checklist for your specific needs:

- Add/remove items based on your application
- Add additional security checks
- Add performance benchmarks
- Add domain-specific checks
- Print and use physical checklist if preferred

---

**Last Updated**: 2024-01-15  
**Next Review**: Quarterly  
**Owner**: DevOps Team

See related guides:
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Setup guide
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- [ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md) - Rollback procedures
- [MONITORING_GUIDE.md](MONITORING_GUIDE.md) - Monitoring setup
- [SECURITY_BEST_PRACTICES.md](SECURITY_BEST_PRACTICES.md) - Security hardening
