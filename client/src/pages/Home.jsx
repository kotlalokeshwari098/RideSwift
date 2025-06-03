import React, { useRef, useState } from "react";
import {useGSAP} from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";


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

  function handleSubmit(e){
  
    e.preventDefault();
    console.log(form);
    setForm({
      pickupLocation:'',
      destinationLocation:''
    })
  }

 

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
     })
     
    }  
    else{
        gsap.to(vehiclePanelRef.current,{
           transform:'translateY(100%)'
     })
    }
}, [vehiclePanelOpen]);


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
         <h5 className="" onClick={()=>setVehiclePanelOpen(false)}><i className="ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-3">Choose a Vehicle</h3>
        <div className="flex items-center justify-between gap-3 w-full border-2  rounded-xl p-2  active:border-black mb-2 border-gray-200">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh5PZ4E5PBYLBwSlIIYPmpkNpYxzRwqdmcVA&s" alt="" className="h-14"/>
           <div className="w-1/2">
               <h3 className="font-medium text-base">RideGo <span><i className="ri-user-3-fill"></i>4</span> </h3>
                <h5 className="font-medium text-sm">2 mins away </h5>
                 <p className="font-medium text-xs text-gray-600">Affordable, compact rides</p>
           </div>
           <h2 className="text-2xl font-semibold">₹193.20</h2>
        </div>
        <div className="flex items-center justify-between gap-3 w-full border-2  rounded-xl p-2 mb-2 active:border-black border-gray-200">
           <img src="https://isakaabengaluru.s3.ap-south-1.amazonaws.com/wp-content/uploads/2023/05/13134245/Grey-2.webp" alt="" className="h-14"/>
           <div className="w-1/2 ml-6">
               <h3 className="font-medium text-base">Moto <span><i className="ri-user-3-fill"></i>1</span> </h3>
                <h5 className="font-medium text-sm">3 mins away </h5>
                 <p className="font-medium text-xs text-gray-600">Affordable, Motorcycle rides</p>
           </div>
           <h2 className="text-2xl font-semibold">₹65</h2>
        </div>
        <div className="flex items-center justify-between gap-3 w-full border-2 active:border-black rounded-xl p-2 mb-2 border-gray-200 ">
           <img src="https://imgd.aeplcdn.com/600x337/n/cw/ec/124027/hyryder-exterior-right-front-three-quarter-73.jpeg?isig=0&q=80" alt="" className="h-12"/>
           <div className="w-1/2">
               <h3 className="font-medium text-base">RideSwift <span><i className="ri-user-3-fill"></i>4</span> </h3>
                <h5 className="font-medium text-sm">9 mins away </h5>
                 <p className="font-medium text-xs text-gray-600">Affordable, compact rides</p>
           </div>
           <h2 className="text-2xl font-semibold">₹201.20</h2>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
