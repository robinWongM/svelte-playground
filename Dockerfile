FROM node:16.14.2-alpine as builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:16.14.2-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

## Svelteが動く3000ポートを開けておく
EXPOSE 3000

CMD ["node", "./dist"]