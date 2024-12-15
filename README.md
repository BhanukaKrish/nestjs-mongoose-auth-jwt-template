### Nest js + Mongoose + Auth + Passport + JWT Boilerplate

## Description

This is a boilerplate for Nest js with Mongoose, Auth, Passport and JWT. This is a simple boilerplate to start a project with Nest js. This boilerplate includes the following features.

- Mongoose
- Auth
- Passport
- JWT
- Typescript

## Installation

```bash
$ yarn install
```

## Configuration

Create a `.env` file in the root of the project and add the following configurations.

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nest
JWT_SECRET=secret

ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d
```


## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Endpoints

- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- GET /auth/profile


## Stay in touch

- Author - [Bhanuk Krish](https://github.com/BhanukaKrish)
- Website - [https://www.bhanukakrish.me/](https://www.bhanukakrish.me/)
