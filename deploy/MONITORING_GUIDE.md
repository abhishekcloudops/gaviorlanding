# Production Monitoring Guide for Gavior

This guide covers monitoring, alerting, and performance tracking for the Gavior production environment.

## Quick Status Checks

### Real-Time Dashboard

```bash
# SSH to EC2
ssh ubuntu@YOUR_EC2_PUBLIC_IP

# Real-time PM2 monitoring (shows CPU, memory, PID)
pm2 monit

# (Press 'q' to exit)
```

### PM2 Status

```bash
# Show all processes
pm2 status

# Show detailed info for gavior
pm2 describe gavior

# Show last 50 log lines
pm2 logs gavior --lines 50

# Stream logs in real-time
pm2 logs gavior

# Show logs with timestamp
pm2 logs gavior --timestamp

# Filter logs by instance
pm2 logs gavior --lines 100 --format short
```

## System Resource Monitoring

### CPU and Memory Usage

```bash
# Check current usage
free -h              # Memory
df -h               # Disk space
top -b -n 1         # Process overview

# Continuous monitoring (updates every 1 second)
watch -n 1 "echo '=== Memory ==='; free -h; echo ''; echo '=== Disk ==='; df -h; echo ''; echo '=== Top Processes ==='; top -b -n 1 | head -n 15"
```

### Disk Space Monitoring

```bash
# Overall disk usage
df -h

# Detailed breakdown
du -sh /home/ubuntu/gaviorlanding/*

# Show largest files
find /home/ubuntu/gaviorlanding -type f -exec du -h {} + | sort -rh | head -20

# Monitor in real-time
watch -n 5 'df -h && echo "" && du -sh /home/ubuntu/gaviorlanding'
```

## Application Monitoring

### Health Checks

```bash
# Local health check (from EC2)
curl -v http://127.0.0.1:3000/

# HTTPS health check (from anywhere)
curl -v https://gavior.in/

# Check response headers
curl -I https://gavior.in/

# Check response time
curl -w "Response time: %{time_total}s\n" https://gavior.in/

# Detailed metrics
curl -w @- -o /dev/null -s https://gavior.in/ << 'EOF'
    time_namelookup:  %{time_namelookup}\n
    time_connect:     %{time_connect}\n
    time_appconnect:  %{time_appconnect}\n
    time_pretransfer: %{time_pretransfer}\n
    time_redirect:    %{time_redirect}\n
    time_starttransfer: %{time_starttransfer}\n
    time_total:       %{time_total}\n
EOF
```

### Process Health

```bash
# Check PM2 process status
pm2 describe gavior | grep -E "status|memory|cpu|pid"

# Watch process memory over time
watch -n 2 'pm2 describe gavior | grep -E "status|memory|cpu|instances"'

# Kill and restart if needed (graceful)
pm2 restart gavior

# Full cluster reload
pm2 reload deploy/pm2/ecosystem.config.cjs --only gavior
```

## Nginx Monitoring

### Nginx Status

```bash
# Check if running
sudo systemctl status nginx

# Test configuration
sudo nginx -t

# View active connections
sudo netstat -an | grep ESTABLISHED | wc -l

# Monitor in real-time
watch -n 1 "sudo netstat -an | grep ESTABLISHED | wc -l"
```

### Access and Error Logs

```bash
# Real-time access logs
sudo tail -f /var/log/nginx/access.log

# Last 50 lines
sudo tail -n 50 /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log

# Count requests by status code
sudo tail -n 1000 /var/log/nginx/access.log | awk '{print $9}' | sort | uniq -c

# Count requests by IP
sudo tail -n 1000 /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -rn

# Find slow requests (>1 second)
sudo tail -n 1000 /var/log/nginx/access.log | awk '$NF > 1'

# Top 10 most requested URLs
sudo tail -n 1000 /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -rn | head -10

# Status code distribution
sudo tail -n 5000 /var/log/nginx/access.log | \
  awk '{print $9}' | \
  sort | uniq -c | \
  sort -rn | \
  awk '{printf "%-4d: %s\n", $2, $1}'
```

## SSL Certificate Monitoring

### Certificate Status

```bash
# View all certificates
sudo certbot certificates

# Detailed certificate info
openssl s_client -connect gavior.in:443 -servername gavior.in

# Check expiry date
echo | openssl s_client -servername gavior.in -connect gavior.in:443 2>/dev/null | \
  openssl x509 -noout -dates

# Days until expiry
echo | openssl s_client -servername gavior.in -connect gavior.in:443 2>/dev/null | \
  openssl x509 -noout -dates | \
  grep notAfter | sed 's/notAfter=//' | xargs -I {} date -d {} +%s | \
  xargs -I {} bash -c "echo $((({}-$(date +%s))/86400)) days remaining"
```

### Auto-Renewal Status

```bash
# Check certbot timer
sudo systemctl status certbot.timer

# View certbot timer schedule
sudo systemctl list-timers certbot.timer

# Test renewal (dry run)
sudo certbot renew --dry-run

# Manual renewal
sudo certbot renew

# View renewal log
sudo tail -f /var/log/letsencrypt/letsencrypt.log
```

## Performance Metrics

### Startup Time Tracking

```bash
# Check PM2 startup time
pm2 describe gavior | grep "created at"

# Track application boot time
time npm run build && time npm start
```

### Memory Usage Trends

```bash
# Get current memory stats
pm2 describe gavior | grep memory

# Create a memory usage report (add to cron for regular tracking)
cat > ~/gavior-memory-stats.sh << 'EOF'
#!/bin/bash
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
MEMORY=$(pm2 describe gavior | grep memory | awk '{print $NF}')
echo "$TIMESTAMP: $MEMORY" >> ~/gavior-memory-usage.log
tail -n 10 ~/gavior-memory-usage.log
EOF

chmod +x ~/gavior-memory-stats.sh

# Run hourly via cron
# Add to crontab: 0 * * * * ~/gavior-memory-stats.sh
```

## Monitoring Dashboard Script

Create an at-a-glance monitoring dashboard:

```bash
cat > ~/monitoring-dashboard.sh << 'EOF'
#!/bin/bash

clear
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║           GAVIOR PRODUCTION MONITORING DASHBOARD              ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "📊 APPLICATION STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pm2 describe gavior | grep -E "status|instances|memory|cpu" | sed 's/^/  /'
echo ""

echo "💾 SYSTEM RESOURCES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Memory: $(free -h | grep Mem | awk '{print $3 "/" $2}')"
echo "  Disk:   $(df -h / | tail -1 | awk '{print $3 "/" $2 " (" $5 ")"}')"
echo "  Load:   $(uptime | awk -F'load average:' '{print $2}')"
echo ""

echo "🌐 NGINX STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if sudo systemctl is-active nginx >/dev/null; then
  echo "  Status: ✅ Running"
else
  echo "  Status: ❌ Stopped"
fi
echo "  Connections: $(sudo netstat -an 2>/dev/null | grep ESTABLISHED | wc -l || echo 'N/A')"
echo ""

echo "🔒 SSL CERTIFICATE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v openssl &> /dev/null; then
  EXPIRY=$(echo | openssl s_client -servername gavior.in -connect gavior.in:443 2>/dev/null | \
    openssl x509 -noout -dates 2>/dev/null | grep notAfter | sed 's/notAfter=//')
  if [ -n "$EXPIRY" ]; then
    DAYS=$(($(date -d "$EXPIRY" +%s 2>/dev/null || echo 0) - $(date +%s)) / 86400))
    echo "  Expires: $EXPIRY"
    echo "  Days remaining: $DAYS"
    if [ $DAYS -lt 7 ]; then
      echo "  ⚠️  Warning: Certificate expires in less than 7 days!"
    fi
  fi
fi
echo ""

echo "📝 RECENT LOGS (last 5 lines)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pm2 logs gavior --lines 5 --nostream 2>/dev/null | sed 's/^/  /'
echo ""

echo "✅ Last updated: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""
EOF

chmod +x ~/monitoring-dashboard.sh

# Run it anytime
~/monitoring-dashboard.sh

# Update every 10 seconds
watch -n 10 ~/monitoring-dashboard.sh
```

## Automated Monitoring via Cron

```bash
# Add to crontab
crontab -e

# Add these lines:

# Check health every 5 minutes, restart if down
*/5 * * * * curl -sf http://127.0.0.1:3000/ >/dev/null 2>&1 || pm2 restart gavior

# Daily certificate check
0 8 * * * echo "Certificate status: $(echo | openssl s_client -servername gavior.in -connect gavior.in:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)" >> ~/gavior-monitoring.log

# Weekly system health report
0 9 * * 0 (echo "=== Weekly Health Report ==="; echo "Date: $(date)"; echo "Uptime: $(uptime)"; echo "Memory: $(free -h)"; echo "Disk: $(df -h /)"; pm2 status) >> ~/gavior-health-report.log

# Monthly PM2 save
0 0 1 * * pm2 save
```

## Alert Conditions

Monitor these conditions and take action:

### Critical (Immediate Action)
- Application not responding (HTTP 5xx)
- Disk usage > 95%
- Memory usage > 90%
- PM2 process in error state
- SSL certificate expires < 7 days

### Warning (Action Within 24 Hours)
- Response time > 2 seconds
- Memory usage > 80%
- Disk usage > 80%
- Multiple error log entries

### Info (Action Within 1 Week)
- Unread log lines accumulating
- Nginx config warnings
- System updates available

## External Monitoring Services

### Setup Uptime Monitoring

```bash
# Add to cron to ping an uptime service every 5 minutes
*/5 * * * * curl -sf https://uptime-service.example.com/ping/gavior-site

# Example services:
# - UptimeRobot (free tier available)
# - Pingdom
# - StatusCake
```

### Setup Log Aggregation

Consider these options for centralized logging:
- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **CloudWatch** (AWS native)
- **Datadog**
- **New Relic**
- **Papertrail** (log aggregation service)

## Monitoring Checklist

Daily:
- [ ] Application responding: `curl https://gavior.in`
- [ ] PM2 processes running: `pm2 status`
- [ ] Disk space: `df -h`
- [ ] Memory usage: `free -h`

Weekly:
- [ ] SSL certificate status: `sudo certbot certificates`
- [ ] Error logs reviewed: `sudo tail -n 100 /var/log/nginx/error.log`
- [ ] System updates: `apt list --upgradable`

Monthly:
- [ ] EC2 snapshot created for backup
- [ ] SSH keys rotated if needed
- [ ] GitHub Actions secrets reviewed
- [ ] Full system health report

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for handling common issues detected during monitoring.
