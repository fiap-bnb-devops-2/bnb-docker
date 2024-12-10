FROM node:20

USER jenkins

WORKDIR /api

COPY --chown=jenkins:jenkins . .
COPY ./.env.production ./.env

RUN npm install

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

# RUN npm start:prod
# CMD ["npm", "start:prod"]
CMD ["node", "dist/main"]