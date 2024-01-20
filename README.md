# Siyabhanga (Backend)

Siyabhanga, meaning "We are banking" in isiZulu, is an online banking app focusing on the backend using Node.js. It manages user registration, authentication, and financial transactions with features like bill payments and fund transfers. The backend employs MongoDB for data storage and JWT for secure authentication, providing a solid foundation for a modern online banking experience.

## Why Siyabhanga's API?

Meet Jane, a diligent developer with a dream of crafting an innovative online banking experience. In her journey, she discovered Siyabhanga's API – a dynamic blend of Node.js, MongoDB, and JWT. This backend not only streamlined Jane's coding process but also ensured robust security and scalability for her envisioned banking application.

Just like Jane, you too can embark on a seamless development journey. Whether you're a visionary developer or an organization striving for cutting-edge financial solutions, Siyabhanga API offers a reliable pathway. Dive into a well-architected backend that not only prioritizes security and scalability but also values the personal stories of those shaping the future of online banking. Elevate your aspirations with Siyabhanga API.

## Quick Start
Follow these steps to quickly set up and run Siyabhanga Backend on your local machine.
### Prerequisites
- Node.js (https://nodejs.org/en) installed on your machine
- MongoDB (https://www.mongodb.com/docs/manual/administration/install-community/) installed and running

### Installation
1. Clone the repository:
```bash
git clone https://github.com/thapelomagqazana/online-banking-app.git
```

2. Navigate to the project directory:
```bash
cd siyabhanga-backend
```
3. Install dependencies:
```bash
npm install
```
### Configuration
1. Create a `.env` file in the project root.
2. Add the following configurations to the `.env` file:
```env
# Database configuration
DATABASE_URL=mongodb://localhost:27017/online-banking

# Secret key for JWT (JSON Web Tokens) authentication
JWT_SECRET=your_jwt_secret_key

# Port for the server to listen on
PORT=5000
```

### Running the Server

1. Start the server:
```bash
node server/server.js
```
2. The server will be running at `http://localhost:5000`.

## Usage
Siyabhanga Backend offers a range of APIs to power your online banking application. Below are the key functionalities and how to use them:

### Authentication

#### Register a new user
- URL: /auth/register

- Method: POST

- Request Body:

```json
{
  "username": "exampleuser",
  "email": "user@example.com",
  "password": "strongpassword"
}
```
- Response:
```json
{
  "message": "User registered successfully"
}
```
#### Login
- URL: /auth/login

- Method: POST

- Request Body:

```json
{
  "username": "exampleuser",
  "email": "user@example.com",
  "password": "strongpassword"
}
```
- Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "redirect": "/dashboard"
}
```
### Account Management
#### Create an account
- URL: /account/create

- Method: POST

- Request Body:
```json
{
  "accountNumber": "123456789",
  "title": "Savings Account"
}
```
- Response:
```json
{
  "message": "Account created successfully",
  "accountId": "5fbb10c73d15ea001c2e00a1"
}
```
#### Get account balance
- URL: /account/balance

- Method: GET

- Query Parameters:
    - accountId: ID of the account

- Response:
```json
{
  "balance": 1500
}
```
#### Get active account
- URL: /account/set-active/:accountId

- Method: POST

- Params:
    - accountId: ID of the account to set as active
- Response:
```json
{
  "message": "Active account set successfully"
}
```
#### Get user accounts
- URL: /account/accounts

- Method: GET

- Response:
```json
{
  "accounts": [
    {
      "userId": "5fbb10c73d15ea001c2e009f",
      "accountNumber": "123456789",
      "balance": 1500,
      "title": "Savings Account",
      "isActive": true
    },
    // Additional accounts
  ]
}
```
### Transaction Management
#### View transaction history
- URL: /transaction/history

- Method: GET

- Query Parameters:

    - accountId: ID of the account (optional)
    - search: Search transactions by description (optional)
    - filter: Filter transactions by type (optional)
    - sort: Sort transactions by field (optional)
    - page: Page number for pagination (optional)
    - limit: Number of transactions per page (optional)
- Response:
```json
{
  "transactions": [
    {
      "userId": "5fbb10c73d15ea001c2e009f",
      "accountId": "5fbb10c73d15ea001c2e00a1",
      "type": "debit",
      "amount": 500,
      "description": "Grocery shopping",
      "timestamp": "2023-12-01T12:30:00.000Z"
    },
    // Additional transactions
  ]
}
```
#### Transfer funds
- URL: /transaction/transfer

- Method: POST

- Request Body:
```json
{
  "accountNumber": "123456789",
  "amount": 200,
  "recipientAccountNumber": "987654321"
}
```
- Response:
```json
{
  "message": "Funds transferred successfully"
}
```
#### View recent transactions
- URL: /transaction/recent

- Method: GET

- Query Parameters:

    - accountId: ID of the account
- Response:
```json
{
  "transactions": [
    {
      "userId": "5fbb10c73d15ea001c2e009f",
      "accountId": "5fbb10c73d15ea001c2e00a1",
      "type": "credit",
      "amount": 200,
      "description": "Transferred from account ABC",
      "timestamp": "2023-12-01T12:30:00.000Z"
    },
    // Additional transactions
  ]
}
```
#### View transaction distribution
- URL: /transaction/distribution

- Method: GET

- Query Parameters:

    - accountId: ID of the account
- Response:
```json
{
  "debitCount": 5,
  "creditCount": 3
}
```
#### View transaction amounts
- URL: /transaction/amounts

- Method: GET

- Response:
```json
{
  "transactionAmounts": [200, 500, 1000, 300, 800]
}
```
### Bill Payment
#### Pay bills
- URL: /bill/pay

- Method: POST

- Request Body:
```json
{
  "accountNumber": "123456789",
  "billAmount": 50,
  "billDescription": "Electricity Bill"
}
```
- Response:
```json
{
  "message": "Bill payment successful"
}
```
- Response: JSON response indicating success or an error message.

## Contributing
We welcome contributions from the community to improve Siyabhanga Backend. Whether you find a bug, have a feature request, or want to contribute code, here's how you can get involved:

### Bug Reports
If you encounter any issues or unexpected behavior, please open an issue on our GitHub repository. Provide detailed information about the problem, including steps to reproduce it.

### Feature Requests
If you have ideas for new features or improvements, feel free to open an issue to discuss them. We appreciate your input and are open to incorporating new functionalities.

### Code Contributions
1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork: `git push origin feature-name`.
5. Create a pull request (PR) against the `main` branch of the original repository.

### Code Style
Follow the existing code style and structure to maintain consistency. Run tests before submitting a PR to ensure that your changes do not break existing functionality.

We appreciate your contributions to make Siyabhanga Backend better and more robust for the community!





