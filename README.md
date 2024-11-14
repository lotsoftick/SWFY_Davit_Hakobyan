<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A hands-on project to test your skills with NestJS, GraphQL, and database operations by completing tasks like feature implementation, bug fixing, and data modification.


## Your tasks are:

-  New Feature: Introduce a Client entity (and CRUD) linked to the Invoice entity with a relationship.
      - Created a migration for the Client table.
      - Created a database entity for Client and linked it to Invoice.
      - Implemented CRUD operations for Client.
      - Added validation exceptions to pinpoint the specific field triggering an error. Detailed error responses are available in the IFailure.alerts object.
      - Updated base.model to remove snake_case, ensuring consistent camelCase syntax across all application responses.
      - Modified GetByIdArgs to use UUID instead of int, aligning with the use of UUID in the Invoice migration file instead of a numerical ID. 
-  Modification: Add a field to Invoice to link to a client and modify the GraphQL resolver to fetch invoices by client
      - Added client_id field in invoice table
      - Implemented functionality by getting invoices by client id
-  Fix the bug: Invoice creation seems to be malfunctioning
      -  Created migration and added fileds quoteNumber, status, issuedAt
      -  Refactored invoice.module ensuring consistent camelCase syntax across all application responses.
      -  Added clientId required variable in invoice creation payload
      -  Implemented saving data invoice table when invoice is created
      -  Implemented reading data from invoice table when geting invoice by id

### Note: You don't have to fix/implement full CRUD for Invoices. Just the creation bug!

## Installation

```bash
$ pnpm install
```

## Build the project first

```bash
$ pnpm run build
```

## Running the app

```bash
# Run this first in order to create a database  
$ docker compose up
```

## Run migrations

```bash
$ pnpm migration:up
```

## Start the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
