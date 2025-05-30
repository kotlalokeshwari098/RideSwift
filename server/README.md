# RideSwift API Documentation

This documentation provides details about the API endpoints available in the RideSwift application.

## User Endpoints

### Register User

Registers a new user in the system.

**URL:** `/users/register`

**Method:** `POST`

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string", // Required, at least 3 characters
    "lastname": "string"   // Optional, at least 3 characters if provided
  },
  "email": "string",       // Required, valid email format
  "password": "string"     // Required, at least 6 characters
}
```

**Response:**
```json
{
  "token": "string",       // JWT token for authentication
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
    // Note: Password is not returned in the response
  }
}
```

**Status Codes:**
- `201 Created`: User successfully registered
- `400 Bad Request`: Validation error or missing fields
- `409 Conflict`: Email already exists

**Example Request:**
```json
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Example Success Response:**
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Login User

Authenticates a user and returns a token.

**URL:** `/users/login`

**Method:** `POST`

**Request Body:**
```json
{
  "email": "string",     // Required, valid email format
  "password": "string"   // Required, at least 6 characters
}
```

**Response:**
```json
{
  "token": "string",     // JWT token for authentication
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
    // Note: Password is not returned in the response
  }
}
```

**Status Codes:**
- `201 Created`: User successfully authenticated
- `400 Bad Request`: Validation error or missing fields
- `401 Unauthorized`: Invalid email or password

**Example Request:**
```json
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Example Success Response:**
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Example Error Response:**
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Invalid email or password"
}
```
