FROM node

RUN mkdir client

WORKDIR /client

COPY package.json ./

RUN npm install

COPY . ./

EXPOSE 5173

CMD ["npm", "run", "dev"]
