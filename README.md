# Payment Gateway Service

This is a scalable and secure payment gateway service designed to handle various types of transactions, including credit card, debit card, and digital wallets.

## Features

- User registration and authentication (JWT-based)
- Payment processing (create, process, retrieve status, refund)
- Secure data handling with encryption
- API documentation with Swagger
- Containerized application using Docker
- CI/CD pipeline for automated deployment

## Technology Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Deployment:** AWS ECS

## Architecture

The architecture of the payment gateway service includes the following components:

- **API Gateway:** Routes incoming requests to the appropriate microservices.
- **Authentication Service:** Handles user registration, login, and JWT token management.
- **Payment Service:** Manages payment-related operations such as creating, processing, and refunding payments.
- **Database:** MongoDB for storing user and payment data.
- **Swagger UI:** Provides API documentation.

## Getting Started

### Prerequisites

- Node.js
- Docker
- AWS account with ECS and IAM setup

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/payment-gateway-service.git
    cd payment-gateway-service
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Running Locally

To run the application locally:

1. Start the MongoDB server (you can use a local instance or a cloud service like MongoDB Atlas).
2. Set up environment variables in a `.env` file:

    ```bash
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

3. Start the application:

    ```bash
    npm run dev
    ```

The API will be available at `http://localhost:5000`.

### Docker

To build and run the Docker container:

1. Build the Docker image:

    ```bash
    docker build -t payment-gateway-service .
    ```

2. Run the Docker container:

    ```bash
    docker run -p 5000:5000 payment-gateway-service
    ```

### API Documentation

The API documentation is available at `http://localhost:5000/docs` when the application is running.


## System Design

The detailed system design document can be found [here](./System_Design_Document.pdf).

## Security Measures

- **Data Encryption:** All sensitive data is encrypted.
- **Authentication and Authorization:** JWT is used for securing endpoints.
- **Secure Communication:** HTTPS should be enforced in production.

