# Gavior production deployment

This guide provisions an Ubuntu 24.04 EC2 instance running Gavior behind Nginx and PM2. CI validates every pull request; a successful push to `main` deploys from GitHub Actions over SSH.

## One-time server provisioning

1. Point the `A` records for `gavior.in` and `www.gavior.in` at the EC2 public IPv4 address. Wait until both resolve before requesting a certificate.
2. Connect as `ubuntu`, clone this repository to `/home/ubuntu/gavior`, and run:

   ```bash
   cd /home/ubuntu/gavior
   chmod +x deploy/bootstrap-ec2.sh deploy/deploy-remote.sh
   APP_DIRECTORY=/home/ubuntu/gavior DOMAIN_NAME=gavior.in bash deploy/bootstrap-ec2.sh
   ```

3. Copy the exact output of `ssh-keyscan -H <EC2_PUBLIC_IP>` into the GitHub secret `EC2_KNOWN_HOSTS`. Review the fingerprint from the EC2 console before saving it.

## GitHub Actions secrets

Create these repository or `production` environment secrets:

| Secret | Value |
| --- | --- |
| `EC2_HOST` | EC2 public IPv4 address or hostname |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Private SSH key permitted for `ubuntu` |
| `APP_DIRECTORY` | `/home/ubuntu/gavior` |
| `DOMAIN_NAME` | `gavior.in` |
| `EC2_KNOWN_HOSTS` | Pinned `ssh-keyscan -H` entry for the EC2 host |

Never commit the private key, `.env*` files, or the generated certificate files.

## Deployment and rollback

The workflow in `.github/workflows/deploy.yml` runs `npm ci`, lint, and build before it connects to EC2. The host records the running Git revision, builds the new revision while the old PM2 cluster serves traffic, then gracefully reloads PM2. It checks `127.0.0.1:3000`; on any failure it resets to the prior revision, reinstalls dependencies, rebuilds, and reloads the prior release.

To manually roll back to a specific successful revision:

```bash
cd /home/ubuntu/gavior
git fetch origin
git reset --hard <known-good-commit>
npm ci --no-audit --no-fund
npm run build
pm2 reload deploy/pm2/ecosystem.config.cjs --only gavior --update-env
pm2 save
```

## Validation and monitoring

```bash
curl -I https://gavior.in
sudo certbot renew --dry-run
pm2 status
pm2 logs gavior --lines 100
pm2 monit
sudo systemctl status nginx
sudo tail -f /var/log/nginx/access.log /var/log/nginx/error.log
df -h
free -h
uptime
top
```

## Troubleshooting

- **Certificate fails:** confirm both DNS records point to EC2 and that ports 80/443 are reachable. Check `sudo nginx -t` and `/var/log/letsencrypt/letsencrypt.log`.
- **SSH deploy fails:** confirm the `ubuntu` user, the private key, EC2 security group port 22 rule, and pinned `EC2_KNOWN_HOSTS` value.
- **502 Bad Gateway:** run `pm2 status`, `pm2 logs gavior --lines 100`, then confirm `curl -I http://127.0.0.1:3000` works locally.
- **Nginx config error:** restore the previous file in `/etc/nginx/sites-available/gavior`, run `sudo nginx -t`, then reload Nginx.

## Security practices

- Restrict the EC2 security group to TCP 22 only from trusted admin IPs; allow TCP 80/443 publicly.
- Keep UFW enabled and allow only OpenSSH plus Nginx Full.
- Use a dedicated deploy key with no passphrase and rotate it on staff changes or suspected exposure.
- Pin the server SSH host key with `EC2_KNOWN_HOSTS`; do not disable host key verification.
- Apply Ubuntu security updates regularly and enable automated backups/snapshots for the EC2 volume.
