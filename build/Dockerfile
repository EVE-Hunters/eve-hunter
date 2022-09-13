FROM php:8.1-apache-buster

# OS Packages
RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        zip unzip mariadb-client redis-tools jq \
        libzip-dev libpq-dev libpng-dev libjpeg-dev libgmp-dev libbz2-dev libfreetype6-dev libicu-dev \
        git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# PHP Extensions
RUN pecl install redis && \
    docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg && \
    docker-php-ext-install zip pdo pdo_mysql gd bz2 gmp intl pcntl opcache && \
    docker-php-ext-enable redis

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin \
    --filename=composer && hash -r

ENV COMPOSER_MEMORY_LIMIT -1

# Download application
#RUN git clone -b 1.1 --single-branch https://github.com/EVE-Hunters/eve-hunter.git /var/www/eve-hunter
RUN mkdir /var/www/eve-hunter
COPY ./ /var/www/eve-hunter


# Setup http
RUN cd /var/www/eve-hunter && \
    composer install --no-scripts --no-ansi --no-progress && \
    composer clear-cache --no-ansi && \
    chown -R www-data:www-data /var/www/eve-hunter && \
    php -r "file_exists('.env') || copy('.env.example', '.env');"

RUN npm install && \
    npm run build


#COPY files/js /var/www/eve-hunter/public
#COPY files/css /var/www/eve-hunter/public

RUN rmdir /var/www/html && \
    ln -s /var/www/eve-hunter/public /var/www/html

RUN a2enmod rewrite
EXPOSE 80

#
WORKDIR /var/www/eve-hunter


COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


ENTRYPOINT ["/entrypoint.sh"]
