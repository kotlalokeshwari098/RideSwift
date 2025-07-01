import React, { useRef, useState, useEffect } from "react";
import {useGSAP} from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";
import { mapService } from "../services/api.service";
import axiosInstance from '../api/axiosConfig'
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import {UserDataContext} from '../context/UserContext'

const Home = () => {

  const {socket}=useContext(SocketContext)
  const {user}=useContext(UserDataContext)
  const [form,setForm]=useState({
    pickupLocation:'',
    destinationLocation:''
  })
  const [activeField, setActiveField] = useState(null); // 'pickup' or 'destination'
  const [panelOpen,setPanelOpen]=useState(false)
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const panelRef=useRef(null)
  const panelCloseRef=useRef(null)
  const vehiclePanelRef=useRef(null)
  const [vehiclePanelOpen,setVehiclePanelOpen]=useState(false)
  const [confirmRidePanel,setConfirmRidePanel]=useState(false);
  const confirmRidePanelRef=useRef(null)

  const [vehicleFound,setVehicleFound]=useState(false)
  const vehicleFoundRef=useRef(null)
  const waitingForDriverRef=useRef(null)
  const [waitingForDriver,setWaitingForDriver]=useState(false)

  const [fare,setFare]=useState({})

  const [vehicleType,setVehicleType]=useState('')

  // Fetch suggestions when input changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!activeField) return;
      
      const query = activeField === 'pickup' ? form.pickupLocation : form.destinationLocation;
      
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }
      
      try {
        setLoading(true);
        const data = await mapService.getAddressSuggestions(query);
        
        if (data && data.features) {
          // Transform the response to a more usable format
          const formattedSuggestions = data.features.map(feature => {
            const props = feature.properties;
            const address = [
              props.name,
              props.street,
              props.city,
              props.state,
              props.country
            ].filter(Boolean).join(', ');
            
            return {
              address,
              coordinates: feature.geometry.coordinates
            };
          });
          
          setSuggestions(formattedSuggestions);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [form.pickupLocation, form.destinationLocation, activeField]);

  function handleSubmit(e){
    e.preventDefault();
    console.log(form);
  }

  const handleInputFocus = (field) => {
    setActiveField(field);
    setPanelOpen(true);
  };

  const handleSelectLocation = (selectedLocation) => {
    if (activeField === 'pickup') {
      setForm(prev => ({...prev, pickupLocation: selectedLocation.address}));
    } else if (activeField === 'destination') {
      setForm(prev => ({...prev, destinationLocation: selectedLocation.address}));
    }
    
  };

  //GSAP hooks for animations for panels
  useGSAP(() => {
  console.log("GSAP running", panelOpen, panelRef.current);
  if(panelOpen){
          gsap.to(panelRef.current,{
           height:'450px',
     })
      gsap.to(panelCloseRef.current,{
      opacity:1
     })
    
    }else{
      gsap.to(panelRef.current,{
        height:'-10px'
      })
      gsap.to(panelCloseRef.current,{
      opacity:0
     })
    }  
}, [panelOpen]);


  useGSAP(() => {
  if(vehiclePanelOpen){
          gsap.to(vehiclePanelRef.current,{
           transform:'translateY(0)'
     })}  
    else{
        gsap.to(vehiclePanelRef.current,{
           transform:'translateY(100%)'
     })
    }
}, [vehiclePanelOpen]);


  useGSAP(() => {
  if(confirmRidePanel){
          gsap.to(confirmRidePanelRef.current,{
           transform:'translateY(0)'
     })}  
    else{
        gsap.to(confirmRidePanelRef.current,{
           transform:'translateY(100%)'
     })
    }
}, [confirmRidePanel]);


  useGSAP(() => {
  if(vehicleFound){
          gsap.to(vehicleFoundRef.current,{
           transform:'translateY(0)'
     })}  
    else{
        gsap.to(vehicleFoundRef.current,{
           transform:'translateY(100%)'
     })
    }
}, [vehicleFound]);

  useGSAP(() => {
  if(waitingForDriver){
          gsap.to(waitingForDriverRef.current,{
           transform:'translateY(0)'
     })}  
    else{
        gsap.to(waitingForDriverRef.current,{
           transform:'translateY(100%)'
     })
    }
}, [waitingForDriver]);


//to get the fare for the different vehicles
 async  function findTrip(){
    setVehiclePanelOpen(true)
    setPanelOpen(false)
    const token=localStorage.getItem('token')
     const response = await axiosInstance.get('/ride/getfare',{
        params:{
          pickup:form.pickupLocation,destination:form.destinationLocation
        },
        headers:{
          Authorization:`Bearer ${token}`
        }
     })
     setFare(response.data)
     console.log(response.data)

   }

  async function createRide(){
      const token=localStorage.getItem('token')
      const response=await axiosInstance.post('/ride/create',{
        pickup:form.pickupLocation,
        destination:form.destinationLocation,
        vehicleType
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
   }
   console.log(panelOpen)


   useEffect(()=>{
    console.log("user hi thats me i am the problem",user)
    if(!user) return;
     socket.emit('join',{
      userType:"user",
      userId:user._id
     })
    console.log(user)
    
   },[user,socket])
   

  return (
    <div className="h-screen relative overflow-hidden">
      <img
         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaI0-AaIAcwVCkcnR8xdetso-wz9rCOVJB5Q&s"
        alt=""
        className="h-16  mb-2 absolute top-5 left-5"/>
      <div className="h-screen w-screen">
        {/* image for temporary use */}
        <img
          src="https://preview.redd.it/ty09jdaxkdf91.jpg?width=1080&crop=smart&auto=webp&s=06db6609ba80d8d3017a66a7f3d2f8932bd2321f"
          alt=""
          className="h-full w-full object-fit object-cover"
        />
      </div>

      <div className="bg-white absolute w-full  bottom-0  flex flex-col justify-end">
        <div className="h-[30%] p-5">
          <h5 className="absolute top-2 text-2xl right-6 opacity-0" onClick={()=>setPanelOpen(false)} ref={panelCloseRef}>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form onSubmit={handleSubmit}>
            <div className="line absolute h-16 w-1 top-[90px] left-[30px] bg-gray-900 rounded-full"></div>
            <input
              type="text"
              placeholder="Add a pick-up Location"
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg my-3 w-full "
              value={form.pickupLocation}
              onChange={(e)=>setForm((prev)=>({...prev,pickupLocation:e.target.value}))}
              onClick={()=>handleInputFocus('pickup')}
              onFocus={()=>handleInputFocus('pickup')}
            />
            <input
              type="text"
              placeholder="Enter your destination"
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              value={form.destinationLocation}
              onChange={(e)=>setForm((prev)=>({...prev,destinationLocation:e.target.value}))}
              onClick={()=>handleInputFocus('destination')}
              onFocus={()=>handleInputFocus('destination')}
            />
          </form>
          <button
            className="mt-4 w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-colors duration-200"
            onClick={findTrip}
          >
             Find Trip
          </button>
        </div>
       <div
          ref={panelRef}
          className="bg-white w-full"
        >
          <LocationSearchPanel 
            setPanelOpen={setPanelOpen} 
            setVehiclePanel={setVehiclePanelOpen}
            suggestions={suggestions}
            loading={loading}
            activeField={activeField}
            onSelectLocation={handleSelectLocation}
          />
        </div>
      </div>

      <div className="fixed z-100 bottom-0 bg-white p-3 w-full" ref={vehiclePanelRef}>
        <VehiclePanel 
        setVehiclePanelOpen={setVehiclePanelOpen} setConfirmRidePanel={setConfirmRidePanel} 
        fare={fare}  
        setVehicleType={setVehicleType}/>
        
      </div>
      <div className="fixed z-100 bottom-0 bg-white p-3 w-full" ref={confirmRidePanelRef}>
        <ConfirmedRide 
         fare={fare} 
         vehicleType={vehicleType}
         createRide={createRide}
        pickupLocation={form.pickupLocation}
        destinationLocation={form.destinationLocation}
        setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen}  setVehicleFound={setVehicleFound}
        />
        
      </div>
      <div className="fixed z-100 bottom-[-2] bg-white p-3 w-full" ref={vehicleFoundRef} >
       
        <LookingForDriver 
        fare={fare} 
         vehicleType={vehicleType}
         createRide={createRide}
        pickupLocation={form.pickupLocation}
        destinationLocation={form.destinationLocation}        
        setVehicleFound={setVehicleFound}/>
      </div>

      <div className="fixed z-100 bottom-[-20] bg-white p-3 w-full" ref={waitingForDriverRef} >
       
        <WaitForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  );
};

export default Home;
