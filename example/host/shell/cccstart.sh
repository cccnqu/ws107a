#!/bin/sh
# cp nginx/sites-enabled/default /etc/nginx/sites-enabled/default
/root/deploy/cccstop.sh
systemctl start nginx
/usr/bin/node /usr/local/bin/pm2 start /root/deploy/mdbook/bookServer.js
/usr/bin/node /usr/local/bin/pm2 start /root/deploy/rpgbot/rpgbot.js
