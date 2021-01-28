FROM python:3.8
WORKDIR /code
ADD . /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install -r requirements.txt 
COPY . /code
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
ENTRYPOINT ["dockerize", "-wait", "tcp://mysql_sv:3306", "-timeout", "20s"]