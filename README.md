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

---

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

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

### **Policies**

#### Get Pending Policies Under a Plan
- **Method**: `GET`
- **Endpoint**: `/policies/pending/{planId}`

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

#### Get all Activated Plans by Plan ID
- **Method**: `GET`
- **Endpoint**: `/policies/activated?planId={planId}`

---

## Testing

