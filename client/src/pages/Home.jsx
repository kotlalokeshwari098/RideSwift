import React, { useRef, useState } from "react";
import {useGSAP} from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";


const Home = () => {

  const [form,setForm]=useState({
    pickupLocation:'',
    destinationLocation:''
  })
  const [panelOpen,setPanelOpen]=useState(false)
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


  function handleSubmit(e){
  
    e.preventDefault();
    console.log(form);
    setForm({
      pickupLocation:'',
      destinationLocation:''
    })
  }

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


   console.log(panelOpen)
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
              onClick={()=>setPanelOpen(true)}
            />
            <input
              type="text"
              placeholder="Enter your destination"
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              value={form.destinationLocation}
              onChange={(e)=>setForm((prev)=>({...prev,destinationLocation:e.target.value}))}
              onClick={()=>setPanelOpen(true)}
            />
          </form>
        </div>
       <div
          ref={panelRef}
          className="bg-white w-full"
        >
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanelOpen}/>
        </div>
      </div>

      <div className="fixed z-100 bottom-0 bg-white p-3 w-full" ref={vehiclePanelRef}>
        <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} setConfirmRidePanel={setConfirmRidePanel}/>
        
      </div>
      <div className="fixed z-100 bottom-0 bg-white p-3 w-full" ref={confirmRidePanelRef}>
        <ConfirmedRide setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen}  setVehicleFound={setVehicleFound}/>
        
      </div>
      <div className="fixed z-100 bottom-0 bg-white p-3 w-full" ref={vehicleFoundRef} >
       
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

      <div className="fixed z-100 bottom-0 bg-white p-3 w-full" ref={waitingForDriverRef} >
       
        <WaitForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  );
};

export default Home;
