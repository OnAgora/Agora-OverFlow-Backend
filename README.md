# Nporium - Backend

## About The Project

Todo: Need to add blurb here

## Getting Started

To get a local copy up and running, please follow these simple steps.

### 1. Install Dependencies

- `NodeJS v16.x` or above. See: [Node installation instructions](https://nodejs.org/en/) <br/>
- `flow-cli` [Flow CLI installation instructions](https://docs.onflow.org/flow-cli) <br/>
- `PostgreSQL` [PostgreSQL installation instructions](https://www.postgresql.org/download/)

### 2. Clone the project

```sh
git clone --depth=1 https://github.com/Nporium/backend.git
```

### Prerequisites

Here is what you need to be able to run the project.

- Node.js
- PostgreSQL
- NPM _(recommended)_


## Development Setup

1. Clone the repo
   ```sh
   git clone https://github.com/Nporium/backend.git .
   ```
2. Install packages with yarn
   ```sh
   npm install
   ```
3. Copy `.env.example` to `.env`
4. Configure environment variables in the .env file. Replace `<user>`, `<pass>`, `<db-host>`, `<db-port>` with their applicable values

   ```
   DATABASE_URL='postgresql://<user>:<pass>@<db-host>:<db-port>'
   ```
   
   Start server
   ```sh
   pg_ctl -D /usr/local/var/postgres start
   ```
6. Set up the database using the Prisma schema (found in `prisma/schema.prisma`)
   ```sh
   npx prisma db push
   ```
7. Run (in development mode)
   ```sh
   npm run start
   ```
8. Open [Prisma Studio](https://www.prisma.io/studio) to look at or modify the database content:
   ```
   npx prisma studio
   ```

## Upgrading

1. Pull the current version:
   ```
   git pull
   ```
2. Apply database migrations by running <b>one of</b> the following commands:

   In a development environment, run:

   ```
   npx prisma migrate dev
   ```

   (this can clear your development database in some cases)

   In a production environment, run:

   ```
   npx prisma migrate deploy
   ```

3. Check the `.env.example` and compare it to your current `.env` file. In case there are any fields not present in your current `.env`, add them there.

1. To start the server, just do:
   ```
   npm run start
   ```

## Testing

The testing framework for the Flow Cadence contract uses [Overflow](https://github.com/bjartek/overflow)

To test the contracts go to the Cadence folder `cd CadenceGo` and run the below command

```
go run ./tasks/main.go
```