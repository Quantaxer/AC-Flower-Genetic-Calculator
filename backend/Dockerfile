FROM node:13.12.0-alpine

WORKDIR /app

# install app dependencies
COPY package.json /app

# add app
COPY . /app

RUN npm install --silent

# start app
CMD ["npm", "start"]
