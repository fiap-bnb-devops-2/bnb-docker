FROM node:20

USER node

WORKDIR /api

COPY --chown=node:node . .

RUN npm install

RUN npm run build

EXPOSE 3000

# RUN npm start:prod
# CMD ["npm", "start:prod"]
CMD ["node", "dist/main"]