docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker run --name mysql-test -v ./mysql/db:/etc/mysql/conf.d -v ./mysql/db:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 -p 3306:3306 -d mysql:latest
