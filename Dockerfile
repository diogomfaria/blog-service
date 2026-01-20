
FROM node:20-alpine As development

RUN npm install -g pnpm
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .
RUN pnpm prisma generate

USER node

FROM node:20-alpine As build

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node package.json pnpm-lock.yaml ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN pnpm run build

RUN pnpm prune --prod

FROM node:20-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

RUN apk add --no-cache openssl

EXPOSE 3000
CMD [ "node", "dist/main.js" ]