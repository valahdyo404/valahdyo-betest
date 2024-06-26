# User Microservices API

## Overview

This project implements a microservices-based architecture for managing user data and account login information. It includes CRUD operations for user information, JWT-based authentication, Redis caching, and Kafka messaging. The microservices are built using Node.js and Express, and the data is stored in MongoDB.

## Features

- **User Management**: Create, read, update, and delete user information.
- **Account Login Management**: Manage account login details.
- **JWT Authentication**: Secure APIs using JWT tokens.
- **Redis Caching**: Cache user information to improve performance.
- **Kafka Messaging**: Produce user data to Kafka when a user is created.
- **Unit Tests**: Comprehensive unit tests for services.
- **Swagger Documentation**: API documentation using Swagger.

## Requirements

- Node.js (>= 16.x)
- MongoDB
- Redis
- Kafka
- Docker (optional, for containerized deployment)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/valahdyo40/valahdyo-betest.git
cd valahdyo-betest
npm install

```

### 2. Create Env File
Create a .env file in the root of the project and add the following variables:
```bash
JWT_SECRET=secret
MONGODB_URI=mongodb+srv://btpn_test:btpn_test@cluster0.sasqlue.mongodb.net/db_valahdyo_betest?retryWrites=true&w=majority&appName=Cluster0
KAFKA_BROKER=localhost:9092
REDIS_URI=redis://localhost:6379
PORT=3000
```

### 3. Start docker compose and start project
```bash
docker-compose up --build
npm start
```

### 4. Access Documentation
- **Postman** :  https://documenter.getpostman.com/view/19880774/2sA3drHEi9
- **Swagger** : {{server-url}}:3000/api-docs
