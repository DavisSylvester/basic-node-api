FROM node:18
EXPOSE 3000
RUN mkdir /api
WORKDIR /api
COPY . /api/
RUN npm i -g typescript
RUN ls -la
RUN npm i
RUN tsc
CMD ["npm", "run", "serve:api"]