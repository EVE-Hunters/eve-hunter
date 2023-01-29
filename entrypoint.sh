#!/bin/bash

set -e

if ! [[ "$1" =~ ^(web|worker|cron|websocket)$ ]]; then
    echo "Usage: $0 [service]"
    echo " Services can be web; worker; cron, websocket"
    exit 1
fi


# Wait for MySQL
echo "Checking MYSQL Connection"
while ! mysqladmin ping -h"$DB_HOST" -u"$DB_USERNAME" -p"$DB_PASSWORD" -P${DB_PORT:-3306} --silent; do
    echo "MariaDB container might not be ready yet. Sleeping..."
    sleep 3
done
echo "MYSQL connection found"

# Wait for Redis
echo "Checking redis connection"
while ! redis-cli -h "$REDIS_HOST" ping; do
    echo "Redis container might not be ready yet. Sleeping..."
    sleep 3
done
echo "Redis Connection Found"


function cache_config(){

    # Clear and repopulate the config cache
    php artisan config:cache

    # Clear and repopulate the route cache
    php artisan route:cache
}

function webserver_start(){
    echo "Migrating";
    php artisan migrate --force
    php artisan sde:file-cache

    cache_config

    apache2-foreground
}

function worker_start(){
    cache_config

    chown -R www-data:www-data storage

    php artisan horizon
}

function cron_start(){
    cache_config

    while :
    do
        php /var/www/eve-hunter/artisan schedule:run &
        sleep 60
    done
}


case $1 in
    web)
        echo "starting web service"
        webserver_start
        ;;
    worker)
        echo "starting workers via horizon"
        worker_start
        ;;
    cron)
        echo "starting cron service"
        cron_start
        ;;
esac
