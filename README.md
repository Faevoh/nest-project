#  Nestjs API for Users and Products

## Description

A Simple Nestjs API that performs CRUD operations on Users and Products. Each user can have more than one product, and only users with admin role are allowed to delete users or products.

## Table of Contents
- [Technologies](#technologies)
- [Project setup and Installation](#project-setup)
- [Usage](#usage)
- [Features](#features)
- [API Documentation](#documentation)
- [Updates on project features](#updates)

## Technologies
- NestJS: Framework used in building the APIs
- TypeOrm: ORM used to interact with MySQL database
- JWT: JSON Web Token for authentication and authorization
- Swagger: To generating API documentation

## Project setup

1. Clone the repository:
```bash
git clone 
```
2. Install dependencies:
```bash
npm install
```
3. Set up MySQL database with migration
```bash
## implement migration by running
npm run migration:generate -- src/DB/migrations/<migration name>
```
```bash
## to save migration changes to database
npm run migration:run
```

## Usage
To compile and run the project, use the following command:
```bash
# development
npm run start
```
```bash
# watch mode
npm run start:dev
```
## Features

- User and Product Management:
   - Create, retrieve, update and delete users and products
   - Users can have their roles updated to admin roles
   - Users can have multiple products
- Authentication:
   - JWT-based authentication for securing endpoints
- API Documentation:
    - Swagger integration for automatically generating API documentation
- Database:
   - TypeORM is used to manage MySQL database.
- Rate Limiting:
  - Limits the number of API requests per user(10 requests per minute).


## API Documentation

The project uses Swagger to provide interactive API documentation. Once server is running, you can access the Swagger UI at:
```bash
http://localhost:4010/api-docs
```

## Updates on Features

Incoming updates on the project features includes:

- Role-Based Access Control
  - Implementing RBAC for Admin to perform delete actions on users and products
- Error Handling and Logging
  - Implementing logging using NestJS Logger
- Testing
  - Implementing unit and integration tests using Jest
- Containerization
  - Using Docker for containerization