# Account and Transaction Management API
This project consists of two backend services for managing user accounts and transactions: Account Manager service and Payment Manager service. Users can register, log in, and perform operations such as sending transactions and withdrawing funds.

## Tech Stack
- Node.js with Fastify framework for API server
- PostgreSQL database with Prisma ORM
- Docker for containerization

## Setup
Clone the repository:

git clone https://github.com/Dhik/payment_app

## Install dependencies:
cd payment_app
npm install
Set up the PostgreSQL database and Supertokens server. Update the connection details in the .env file.

## Run the application:
node src/index.js

Account Manager Service
Endpoints
POST /register: Register a new user with username and password.
POST /login: Log in with username and password.
POST /accounts: Create a new payment account for a user.
GET /accounts/:userId: Get all accounts of a user by user ID.

Payment Manager Service
Endpoints
POST /send: Send a transaction from one account to another.
POST /withdraw: Withdraw funds from an account.
GET /transactions/:accountId: Get all transactions of an account by account ID.

Example Usage
Register a User
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"username": "user1", "password": "password123"}'

Log In
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username": "user1", "password": "password123"}'

Create an Account
curl -X POST http://localhost:3000/accounts -H "Content-Type: application/json" -d '{"userId": 1, "type": "credit"}'

Send Transaction
curl -X POST http://localhost:3000/send -H "Content-Type: application/json" -d '{"accountId": 1, "amount": 100, "toAddress": "recipient@example.com"}'

Withdraw Funds
curl -X POST http://localhost:3000/withdraw -H "Content-Type: application/json" -d '{"accountId": 1, "amount": 50}'

Get Account Transactions
curl http://localhost:3000/transactions/1

Docker
To run the application using Docker, make sure you have Docker installed and running on your system. Then, use the provided Dockerfile and docker-compose.yml files to build and run the containers.

docker-compose up --build

API Documentation Link [Testing]
https://documenter.getpostman.com/view/10467473/2sA3JM8hGx

Additional Notes
Handle error responses appropriately in the API endpoints.
Implement proper input validation and error handling to enhance security and reliability.
Feel free to reach out for any further assistance or clarification!