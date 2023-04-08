FROM node:18-alpine AS build
WORKDIR /app
COPY ./package.json ./package-lock.json ./tsconfig.json ./
RUN npm i --force
COPY ./src ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json /app/dist ./
RUN npm i --force
RUN npm i mysql
EXPOSE 3000
CMD ["node", "main.js"]