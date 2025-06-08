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

## Maps Endpoints

### Get Coordinates

Retrieves the latitude and longitude coordinates for an address.

**URL:** `/map/getcoordinates`

**Method:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `address`: The address to get coordinates for (required, minimum 3 characters)

**Response:**
```json
{
  "latitue": number,
  "longitude": number
}
```

**Status Codes:**
- `200 OK`: Successfully retrieved coordinates
- `400 Bad Request`: Invalid address or validation error
- `404 Not Found`: Coordinates not found

**Example Request:**
```
GET /map/getcoordinates?address=Banjara Hills, Hyderabad
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "latitue": 17.3605890,
  "longitude": 78.4740613
}
```

**Example Error Response:**
```json
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "message": "Coordinates not found"
}
```

### Get Distance and Time

Calculates the distance between two locations.

**URL:** `/map/getdistancetime`

**Method:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `origin`: The starting location address (required, minimum 3 characters)
- `destination`: The ending location address (required, minimum 3 characters)

**Response:**
```json
number  // Distance in meters
```

**Status Codes:**
- `200 OK`: Successfully calculated distance
- `400 Bad Request`: Invalid parameters or validation error
- `404 Not Found`: Coordinates not found or distance calculation failed

**Example Request:**
```
GET /map/getdistancetime?origin=Banjara Hills, Hyderabad&destination=Gachibowli, Hyderabad
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

15234.56
```

**Example Error Response:**
```json
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "message": "Distance and time not found"
}
```

### Get Address Suggestions

Provides autocomplete suggestions for an address input.

**URL:** `/map/getsuggestions`

**Method:** `GET`

**Query Parameters:**
- `input`: The partial address text to get suggestions for (required, minimum 3 characters)

**Response:**
```json
{
  "features": [
    {
      "properties": {
        "name": "string",
        "street": "string",
        "city": "string",
        "state": "string",
        "country": "string",
        "postcode": "string"
      },
      "geometry": {
        "coordinates": [number, number]
      }
    }
  ]
}
```

**Status Codes:**
- `200 OK`: Successfully retrieved suggestions
- `400 Bad Request`: Invalid input or validation error
- `500 Internal Server Error`: Error fetching suggestions

**Example Request:**
```
GET /map/getsuggestions?input=hydra
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "features": [
    {
      "properties": {
        "name": "Hyderabad",
        "city": "Hyderabad",
        "state": "Telangana",
        "country": "India"
      },
      "geometry": {
        "coordinates": [78.4867, 17.3850]
      }
    },
    {
      "properties": {
        "name": "Hydra",
        "city": "Hydra",
        "country": "Greece"
      },
      "geometry": {
        "coordinates": [23.4661, 37.3416]
      }
    }
  ]
}
```

**Example Error Response:**
```json
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "message": "internal server error"
}
```

## Ride Endpoints

### Create Ride

Creates a new ride request.

**URL:** `/ride/create`

**Method:** `POST`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "pickup": "string",       // Required, minimum 3 characters
  "destination": "string",  // Required, minimum 3 characters
  "vehicleType": "string"   // Required, must be one of: "auto", "car", "motorcycle"
}
```

**Response:**
```json
{
  "_id": "string",
  "user": "string",
  "pickup": "string",
  "destination": "string",
  "fare": number,
  "status": "pending",
  "otp": "string"  // Only included in certain responses
}
```

**Status Codes:**
- `201 Created`: Ride successfully created
- `400 Bad Request`: Validation error or missing fields
- `500 Internal Server Error`: Error creating ride

**Example Request:**
```json
POST /ride/create
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "pickup": "Banjara Hills, Hyderabad",
  "destination": "Gachibowli, Hyderabad",
  "vehicleType": "auto"
}
```

**Example Success Response:**
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "_id": "507f1f77bcf86cd799439022",
  "user": "507f1f77bcf86cd799439011",
  "pickup": "Banjara Hills, Hyderabad",
  "destination": "Gachibowli, Hyderabad",
  "fare": 120,
  "status": "pending"
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
    {
      "msg": "Invalid vehicleType address",
      "param": "vehicleType",
      "location": "body"
    }
  ]
}
```

### Get Fare Estimate

Estimates the fare for a ride based on pickup and destination locations.

**URL:** `/ride/getfare`

**Method:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `pickup`: The pickup location address (required, minimum 3 characters)
- `destination`: The destination location address (required, minimum 3 characters)
- `vehicleType`: The type of vehicle for the ride (required, must be one of: "auto", "car", "motorcycle")

**Response:**
```json
{
  "fare": number
}
```

**Status Codes:**
- `200 OK`: Successfully estimated fare
- `400 Bad Request`: Invalid parameters or validation error
- `404 Not Found`: Locations not found or fare calculation failed

**Example Request:**
```
GET /ride/getfare?pickup=Banjara Hills, Hyderabad&destination=Gachibowli, Hyderabad&vehicleType=auto
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "fare": 150
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
    {
      "msg": "Invalid vehicleType address",
      "param": "vehicleType",
      "location": "query"
    }
  ]
}
```

