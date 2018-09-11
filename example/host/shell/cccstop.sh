#!/bin/sh
systemctl stop nginx
/usr/local/bin/pm2 stop all
/usr/local/bin/pm2 delete all
