import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import axiosInstance from "../api/axiosConfig";

const CaptainHome = () => {
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
   const token = localStorage.getItem("token");

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride,setRide]=useState(null)

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  // const [ ride, setRide ] = useState(null)

   const confirmRide=async()=>{
    const response=await axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/ride/confirm`,{
        rideId:ride._id,
        captainId:captain._id
      },
      {
        headers:{
             Authorization:`Bearer ${token}`
        } 
      }
    )     
       setRidePopupPanel(false);
       setConfirmRidePopupPanel(true)
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  useEffect(() => {
    console.log("inside captain home page use effect");
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              lng: position.coords.longitude,
              ltd: position.coords.latitude,
            },
          });
          console.log("captain location updated", {
            lng: position.coords.longitude,
            ltd: position.coords.latitude }) 
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation();
    console.log("captain home page socket connected", locationInterval);

    return () => clearInterval(locationInterval)
  });

  socket.on("new-ride",(data)=>{
    console.log(data);
    setRide(data);
    setRidePopupPanel(true)
  })

 

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="/logorideswift.png"
          alt="RideSwift Logo"
        />
        <Link
          to="/captainhome"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
