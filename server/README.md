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

### User Profile

Retrieves the profile information of the authenticated user.

**URL:** `/users/profile`

**Method:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string"
}
```

**Status Codes:**
- `200 OK`: Successfully retrieved user profile
- `401 Unauthorized`: Invalid or missing token

**Example Request:**
```
GET /users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "507f1f77bcf86cd799439011",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

**Example Error Response:**
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Not authorized, no token"
}
```


### Logout User

Logs out a user by invalidating their token.

**URL:** `/users/logout`

**Method:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Cookies:**
- `token`: JWT token set during login

**Response:**
```json
{
  "message": "Logged out"
}
```

**Status Codes:**
- `200 OK`: Successfully logged out
- `401 Unauthorized`: Invalid or missing token

**Example Request:**
```
GET /users/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Logged out"
}
```

**Example Error Response:**
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Not authorized, no token"
}
```

## Captain Endpoints

### Register Captain

Registers a new captain in the system.

**URL:** `/captain/register`

**Method:** `POST`

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string", // Required, at least 3 characters
    "lastname": "string"   // Optional, at least 3 characters if provided
  },
  "email": "string",       // Required, valid email format
  "password": "string",    // Required, at least 6 characters
  "vehicle": {
    "color": "string",     // Required, at least 3 characters
    "plate": "string",     // Required, at least 3 characters
    "capacity": number,    // Required, minimum 1
    "vehicleType": "string" // Required, must be one of: "car", "motorcycle", "auto"
  }
}
```

**Response:**
```json
{
  "token": "string",       // JWT token for authentication
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    },
    "status": "string",    // "active" or "inactive", default is "inactive"
    // Note: Password is not returned in the response
  }
}
```

**Status Codes:**
- `201 Created`: Captain successfully registered
- `400 Bad Request`: Validation error, missing fields, or email already exists

**Example Request:**
```json
POST /captain/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Example Success Response:**
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "507f1f77bcf86cd799439012",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
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

OR

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "message": "captain with this email already exists"
}
```

### Login Captain

Authenticates a captain and returns a token.

**URL:** `/captain/login`

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
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    },
    "status": "string"
    // Note: Password is not returned in the response
  }
}
```

**Status Codes:**
- `201 Created`: Captain successfully authenticated
- `400 Bad Request`: Validation error or missing fields
- `401 Unauthorized`: Invalid email or password

**Example Request:**
```json
POST /captain/login
Content-Type: application/json

{
  "email": "ranga@gmail.com",
  "password": "bts123"
}
```

**Example Success Response:**
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "6839a1a701c7a210ec8f8b43",
    "fullname": {
      "firstname": "Ranga",
      "lastname": "elit"
    },
    "email": "ranga@gmail.com",
    "vehicle": {
      "color": "red",
      "plate": "MP 12 AB 1234",
      "capacity": 3,
      "vehicleType": "car"
    },
    "status": "inactive"
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

### Captain Profile

Retrieves the profile information of the authenticated captain.

**URL:** `/captain/profile`

**Method:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": number,
    "vehicleType": "string"
  },
  "status": "string",
  "location": {
    "ltd": number,  // Optional
    "lng": number   // Optional
  }
}
```

**Status Codes:**
- `200 OK`: Successfully retrieved captain profile
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: Captain not found

**Example Request:**
```
GET /captain/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "6839a1a701c7a210ec8f8b43",
  "fullname": {
    "firstname": "Ranga",
    "lastname": "elit"
  },
  "email": "ranga@gmail.com",
  "vehicle": {
    "color": "red",
    "plate": "MP 12 AB 1234",
    "capacity": 3,
    "vehicleType": "car"
  },
  "status": "inactive",
  "location": {}
}
```

**Example Error Response:**
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "unauthorized - no token provided"
}
```

### Logout Captain

Logs out a captain by invalidating their token.

**URL:** `/captain/logout`

**Method:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Cookies:**
- `token`: JWT token set during login

**Response:**
```json
{
  "message": "Logged out"
}
```

**Status Codes:**
- `200 OK`: Successfully logged out
- `401 Unauthorized`: Invalid or missing token

**Example Request:**
```
GET /captain/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Logged out"
}
```

**Example Error Response:**
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "unauthorized - no token provided"
}
```

