FROM node:20

USER node

WORKDIR /api

RUN chmod -R 777 /api
COPY --chown=node:node . .
COPY ./.env.production ./.env

RUN npm install

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

# RUN npm start:prod
# CMD ["npm", "start:prod"]
CMD ["node", "dist/main"]