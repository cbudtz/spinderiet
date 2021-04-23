FROM node:14-alpine

WORKDIR /buildpath

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY ./ .
#default url
ARG NEXT_PUBLIC_API_URL=localhost:1377
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
RUN echo "APIURL: $NEXT_PUBLIC_API_URL"
RUN NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}/ && yarn build

EXPOSE 3000

CMD ["yarn", "start"]