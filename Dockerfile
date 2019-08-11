FROM fholzer/nginx-brotli:v1.12.2

LABEL maintainer="Flatland Church"

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY ./build /var/www/today

EXPOSE 80
