FROM node:14-alpine


# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && mkdir -m777 node_modules/.cache
COPY . .

# Set the DATABASE_URL environment variable
# ENV DATABASE_URL postgresql://admin:admin@localhost:5432/postgres

# USER 1000
CMD ["npm","start"]