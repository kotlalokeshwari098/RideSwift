# 🚗 RideSwift

RideSwift is a ride-hailing application that connects passengers with nearby drivers. It enables real-time ride booking, driver discovery, and trip tracking on a clean and responsive interface. The system is built with a scalable architecture using modern technologies to ensure security, efficiency, and smooth performance.

## 🚀 Features

### 1. User & Driver Authentication
- Secure registration and login using JWT.  
- Passwords are encrypted using Bcrypt.  
- Separate dashboards and role-based access for riders and drivers.

### 2. Real-time Ride Request & Matching
- Passengers can request rides by selecting pickup and destination locations.  
- Nearby available drivers are located using geospatial queries.  
- Drivers can accept or reject ride requests.

### 3. Location Tracking & Socket Integration
- Real-time updates using **Socket.IO** for location sharing and ride status.  
- Live communication between rider and driver apps during a trip.

### 4. Trip Status Management
- Ride status flows: Requested → Accepted → Ongoing → Completed.  
- Drivers and users can update the trip status in real time.

### 5. Smart Driver Discovery
- MongoDB’s `$geoWithin` and `$centerSphere` queries to find nearby drivers.  
- Ensures optimized matching based on driver location and availability.

### 6. Ride History & Management
- Users and drivers can view ride history.  
- Details include trip origin, destination, distance, and status.


## 🛠️ Tech Stack

| Layer       | Technology                 |
|-------------|-----------------------------|
| 🌐 Frontend  | React.js, Tailwind CSS       |
| 🖥 Backend   | Node.js, Express.js          |
| 🗄 Database  | MongoDB                      |
| 📡 Realtime  | Socket.IO                    |
| 🔐 Auth      | JWT & Bcrypt                 |
| 📍 Location  | MongoDB Geospatial Queries   |


## 📦 Setup Instructions

### 1. Fork the Repository
Go to [RideSwift Repository](https://github.com/kotlalokeshwari098/RideSwift) and click the **Fork** button in the top-right corner to create a copy under your GitHub account.

### 2. Clone Your Forked Repository
```bash
git clone https://github.com/<your-username>/RideSwift.git
NOTE:Replace <your-username> with your actual GitHub username.
cd RideSwift
```
### 3. Install Server Dependencies
```bash
cd server
npm install
```
### 4. Install Client Dependencies
```bash
cd client
npm install
```
### 5. Set Up Environment Variables
Create a .env file in the server directory with the following:
```bash
PORT=5000
DB_CONNECT=your-db-connection
JWT_SECRET=your_jwt_secret_here

# Optional external geolocation APIs
NOMINATIM_MAPS=https://example.com/nominatim/search
PHOTON_URL=https://example.com/photon/api
```
### 6. Run the Server
```bash
cd server
npm run dev
```
### 7. Run the Client
```bash
cd client
npm run dev
```
---

⚠️ This is a personal project and is not open for external contributions at the moment.
