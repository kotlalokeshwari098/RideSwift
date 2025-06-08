import axios from 'axios';

const BASE_URL = 'http://localhost:5656';

// Create an axios instance with default settings
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Map service endpoints
export const mapService = {
  // Get location suggestions for autocomplete
  getAddressSuggestions: async (query) => {
    try {
      if (!query || query.length < 3) {
        return { features: [] };
      }
      const response = await api.get(`/map/getsuggestions?input=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error getting address suggestions:', error);
      throw error;
    }
  },
  
  // Get coordinates for an address
  getCoordinates: async (address) => {
    try {
      const response = await api.get(`/map/getcoordinates?address=${encodeURIComponent(address)}`);
      return response.data;
    } catch (error) {
      console.error('Error getting coordinates:', error);
      throw error;
    }
  },
  
  // Get distance and time between two locations
  getDistanceTime: async (origin, destination) => {
    const token=localStorage.getItem('jwtToken')
    try {
      const response = await api.get(`/map/getdistancetime?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting distance and time:', error);
      throw error;
    }
  }
};

// Ride service endpoints
export const rideService = {
  createRide: async (pickupLocation, destinationLocation, vehicleType) => {
     const token=localStorage.getItem('jwtToken')
    try {
      const response = await api.post('/ride/create', {
        pickup: pickupLocation,
        destination: destinationLocation,
        vehicleType
      },{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating ride:', error);
      throw error;
    }
  }
};

export default api;
