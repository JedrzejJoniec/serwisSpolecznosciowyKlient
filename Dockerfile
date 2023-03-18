FROM node:latest as node

WORKDIR /usr/src/app/angularproject

COPY ./ /usr/src/app/angularproject

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 4200

CMD ["npm", "start"]