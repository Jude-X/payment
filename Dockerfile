FROM node:14-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . ./

# Build the project
RUN npm run build
RUN npm prune --production

FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

RUN rm -rf /app/dist/migrations/*.d.ts /app/dist/migrations/*.map
COPY --from=builder /app/package.json /app/package.json

ENV REST_PORT=5000
ENV MONGODB_URI="mongodb+srv://okra_takehome:{{Insert Password Here}}@okra-takehome.nopar.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
ENV SALT_ROUNDS=10
ENV JWT_SECRET="sfnei3ri34"
ENV JWT_EXP="600s"

EXPOSE 3000
CMD [ "node", "dist/main" ]
