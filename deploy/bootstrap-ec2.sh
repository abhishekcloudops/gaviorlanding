#!/usr/bin/env bash
# Run once on a new Ubuntu 24.04 EC2 instance as the ubuntu user.
set -Eeuo pipefail

APP_DIRECTORY="${APP_DIRECTORY:-/home/ubuntu/gavior}"
DOMAIN_NAME="${DOMAIN_NAME:-gavior.in}"

sudo apt-get update
sudo apt-get install -y ca-certificates curl git nginx certbot python3-certbot-nginx ufw

curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

sudo install -d -m 755 /var/www/certbot /etc/nginx/conf.d
sudo install -m 644 "$APP_DIRECTORY/deploy/nginx/gavior-websocket.conf" /etc/nginx/conf.d/gavior-websocket.conf
sudo install -m 644 "$APP_DIRECTORY/deploy/nginx/gavior.http.conf" /etc/nginx/sites-available/gavior
sudo ln -sfn /etc/nginx/sites-available/gavior /etc/nginx/sites-enabled/gavior
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

sudo certbot --nginx --non-interactive --agree-tos --redirect \
  --email "admin@${DOMAIN_NAME}" -d "$DOMAIN_NAME" -d "www.${DOMAIN_NAME}"
sudo install -m 644 "$APP_DIRECTORY/deploy/nginx/gavior.conf" /etc/nginx/sites-available/gavior
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl enable --now certbot.timer

cd "$APP_DIRECTORY"
npm ci --no-audit --no-fund
npm run build
pm2 start deploy/pm2/ecosystem.config.cjs --only gavior
pm2 save
sudo env PATH="$PATH" pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo "Bootstrap complete. Verify with: curl -I https://${DOMAIN_NAME}"
