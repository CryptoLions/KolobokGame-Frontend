FROM node:10.15.3

ARG PORT=5050
ENV PORT=${PORT}

ARG CONFIG_NET=production
ENV CONFIG_NET=${CONFIG_NET}

RUN apt-get update && apt-get install -y git git-core

WORKDIR /home/kolobok
COPY . /home/kolobok

RUN npm install -g @angular/cli@7.1.0
RUN cd /home/kolobok && npm install
RUN cd /home/kolobok && npm run postinstall
RUN cd /home/kolobok && ng build --configuration=${CONFIG_NET}

CMD ["node", "/home/kolobok/server.js"]

EXPOSE ${PORT}