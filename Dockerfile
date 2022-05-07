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

RUN a2enmod rewrite
EXPOSE 80

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


ENTRYPOINT ["/entrypoint.sh"]