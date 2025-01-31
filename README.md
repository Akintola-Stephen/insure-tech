# Insure-Tech

## Description

This is a backend application built using NestJS, designed for an insurance management system. The application provides functionality for user management, product management, wallet services, policy management, and more.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Project](#running-the-project)
4. [API Documentation](#api-documentation)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Resources](#resources)
8. [Environment Variables](#environment-variables)


---

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- PostgreSQL (installed and configured)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Akintola-Stephen/insure-tech.git
cd insure-tech
```

2. Install the dependencies:

```bash
npm install
```

---

## Running the Project

### Development Mode

To run the project in development mode:

```bash
npm run start:dev
```

---

## API Documentation


## Base URL

The base URL for the API is:
Make sure to prefix this URL when accessing any endpoint in the API.
```text
`http://localhost:3000/api/v1`
```


Here is the complete API documentation for all available endpoints:

### **User**

#### Create User
- **Method**: `POST`
- **Endpoint**: `/user/create-user`
- **Request Body**:
```json
{
  "name": "Stephen",
  "email": "akintolastepahen224@gmail.com"
}
```

#### Purchase Product(s)
- **Method**: `POST`
- **Endpoint**: `/user/purchase-products/{userId}`
- **Request Body**:
```json
{
  "productIds": [
    {
      "productId": 5,
      "quantity": 2
    },
    {
      "productId": 6,
      "quantity": 10
    }
  ]
}
```

#### Wallet Top Up
- **Method**: `POST`
- **Endpoint**: `/wallet/topUp/{userId}`
- **Request Body**:
```json
{
  "amount": 100000000
}
```

### **Product**

#### Fetch Product By Product Name
- **Method**: `GET`
- **Endpoint**: `/product/{productName}`
- **Response Body Format**:
```json
{
  "id": 6,
  "productName": "Optimal care standard",
  "productAmount": 20000,
  "productCategoryId": 1,
  "createdAt": "2025-01-29T10:26:21.906Z",
  "updatedAt": "2025-01-29T10:26:21.906Z",
  "category": {
    "id": 1,
    "categoryName": "Health"
  }
}
```

#### Create Product
- **Method**: `POST`
- **Endpoint**: `/product/`
- **Request Body**:
```json
{
  "productName": "Optimal care standard",
  "productAmount": 20000.0,
  "productCategoryId": 1
}
```

- **Response Body Format**:
```json
{
  "id": 7,
  "productName": "Optimal care standard",
  "productAmount": 20000,
  "productCategoryId": 1,
  "updatedAt": "2025-01-30T12:52:37.828Z",
  "createdAt": "2025-01-30T12:52:37.828Z"
}
```

### **Product Category**

#### Create Product Category
- **Method**: `POST`
- **Endpoint**: `/product-categories/`
- **Request Body**:
```json
{
  "categoryName": "Auto"
}
```

- **Response Body Format**:
```json
{
  "id": 3,
  "categoryName": "Auto-1",
  "updatedAt": "2025-01-30T12:54:30.497Z",
  "createdAt": "2025-01-30T12:54:30.497Z"
}
```

### **Policies**

#### Get Pending Policies Under a Plan
- **Method**: `GET`
- **Endpoint**: `/policies/pending/{planId}`
- **Response Body Format**:
```json
[
  {
    "id": 7,
    "planId": 17,
    "userId": 3,
    "status": "unused",
    "policyNumber": "Policy-b5490fa7-d3d8-4360-9a73-430a9869c21dPPL",
    "isDeleted": false,
    "createdAt": "2025-01-30T10:20:51.115Z",
    "updatedAt": "2025-01-30T10:20:51.115Z",
    "plan": {
      "id": 17,
      "planName": "Plan-e08bc130-46d5-4027-8adb-c629c245b54f",
      "totalAmount": 40000
    },
    "user": {
      "id": 3,
      "name": "Stephen",
      "email": "akintolastephen224@gmail.com"
    }
  }
]
```

#### Activate a Pending Policy
- **Method**: `POST`
- **Endpoint**: `/policies/activate`
- **Request Body**:
```json
{
  "userId": 3,
  "planId": 24
}
```

- **Response Body Format**:
```json
{
  "message": "Policy activated successfully.",
  "policy": {
    "id": 14,
    "policyNumber": "Policy-c1e75a4c-8525-47cc-b18d-63901858e85aPPL",
    "userId": 3,
    "planId": 24,
    "status": "used"
  },
  "user": {
    "id": 3,
    "name": "Stephen",
    "email": "akintolastephen224@gmail.com"
  },
  "plan": {
    "id": 24,
    "name": "Plan-bec16001-00b1-40ca-974a-174aecc2a320",
    "totalAmount": 220000
  }
}
```

#### Get all Activated Plans by Plan ID
- **Method**: `GET`
- **Endpoint**: `/policies/activated?planId={planId}`
- - **Response Body Format**:
```json
[
  {
    "id": 1,
    "planId": 11,
    "userId": null,
    "status": "used",
    "policyNumber": "Policy-cfca36d8-83c6-4829-a0e0-e9f458d74bbfPPL",
    "isDeleted": false,
    "createdAt": "2025-01-30T10:01:20.998Z",
    "updatedAt": "2025-01-30T11:32:10.907Z",
    "plan": {
      "id": 11,
      "planName": "Plan-7f67648a-2ad1-4a78-8550-f3bcf6294465",
      "totalAmount": 40000
    },
    "user": null
  },
  {
    "id": 14,
    "planId": 24,
    "userId": 3,
    "status": "used",
    "policyNumber": "Policy-c1e75a4c-8525-47cc-b18d-63901858e85aPPL",
    "isDeleted": false,
    "createdAt": "2025-01-30T10:33:49.914Z",
    "updatedAt": "2025-01-30T11:35:06.743Z",
    "plan": {
      "id": 24,
      "planName": "Plan-bec16001-00b1-40ca-974a-174aecc2a320",
      "totalAmount": 220000
    },
    "user": {
      "id": 3,
      "name": "Stephen",
      "email": "akintolastephen224@gmail.com"
    }
  }
]
```

---

## Testing

### Running Tests

To run tests, execute the following command:

```bash
npm run test
```

---

## Deployment

### Setting Up the Database || Environment Variables


The application requires the following environment variables to be configured in the `.env` file:

```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME="INSURE-TECH"
```

Make sure your PostgreSQL database is running and the `.env` file is correctly configured with the proper credentials.


---
