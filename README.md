# Bank Account System

A secure and feature-rich banking system that allows users to manage their accounts, view balances, make deposits/withdrawals, transfer money, view transaction history, and more. Includes robust authentication and an admin panel for user and transaction management.

## Features

### 1. User Registration and Authentication

- **Signup**: Create an account with name, email, password, and personal details.
- **Login**: Authenticate using email and password.
- **JWT Authentication**: Secure user sessions and protect private routes using JSON Web Tokens.

### 2. Account Balance Management

- **View Balance**: Check current account balance.
- **Deposit Funds**: Add money to the account.
- **Withdraw Funds**: Withdraw money with validation to prevent overdrafts.

### 3. Transaction History

- **View History**: See all deposits, withdrawals, and transfers.
- **Create Transactions**: Record all financial activities.
- **Transaction Types**: Identify transactions as deposit, withdrawal, or transfer.

### 4. Money Transfer Between Accounts

- **Transfer Funds**: Send money to other users.
  - Check sender’s balance.
  - Update recipient’s balance.
  - Create transactions for both accounts.
- **Transfer History**: Record and view transfer logs.

### 5. Security

- **Password Hashing**: Secure passwords using bcrypt or argon2.
- **Two-Factor Authentication (optional)**: Additional protection against unauthorized access.

### 6. Admin Panel

- **Admin Login**: Secure admin access.
- **Manage Users**: View, block/unblock users, reset passwords.
- **Transaction Management**: Review and manage user transactions, flag suspicious activity.

### 7. Account Statements

- **Generate Statements**: Download or view statements by time period (monthly, quarterly).
- **Export Formats**: PDF and CSV support for statements.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB 
- **Authentication**: JWT, bcrypt
- **Security**: Helmet, rate limiting, CORS, environment variables

## Installation

#### 1. Clone the repo
   ```bash
   git clone https://github.com/yourusername/bank-account-system.git
   cd bank-account-system
   ```
#### 2. Install dependencies:
```bash
npm install
```
#### 3. Create .env file:
```bash
PORT = 3001
MONGO_DB_URI = mongodb+srv://bank:akash120@cluster0.csgeu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
SECRET_KEY = liton360
```
#### 4. Start the server:
```bash
npm run dev
```
