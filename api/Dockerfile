FROM node:20

RUN groupadd -g 1000 jenkins-user && useradd -m -u 1000 -g jenkins-user jenkins-user

WORKDIR /api

RUN chown -R jenkins-user:jenkins-user /api

USER jenkins-user

COPY --chown=jenkins-user:jenkins-user . .
COPY ./.env.production ./.env

RUN npm install

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

# RUN npm start:prod
# CMD ["npm", "start:prod"]
CMD ["node", "dist/main"]