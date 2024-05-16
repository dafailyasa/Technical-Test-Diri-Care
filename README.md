## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript,
This app is build booking room buildings, we can access swagger `http://localhost:3001/docs` for api documentation. and for the database use mysql.

## Installation

```bash
$ yarn install
```

## Env config
```bash
PORT= 3001
API_PREFIX=v1

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME='root'
DB_PASSWORD='root'
DB_NAME='diri-care-test'
DB_SYNC=true
DB_LOG=true
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

