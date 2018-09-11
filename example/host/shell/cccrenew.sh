#!/bin/sh
/root/deploy/cccstop.sh
/usr/local/sbin/certbot-auto renew >> /var/log/le-renew.log
/root/deploy/cccstart.sh
