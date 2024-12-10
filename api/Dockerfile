FROM node:20

USER root

WORKDIR /api

COPY --chown=root:root . .
#COPY ./.env.production ./.env

RUN chmod -R 777 /api

RUN npm install

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

# RUN npm start:prod
# CMD ["npm", "start:prod"]
CMD ["node", "dist/main"]