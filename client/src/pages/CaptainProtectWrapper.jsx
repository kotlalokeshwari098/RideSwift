import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react';


const CaptainProtectWrapper = ({children}) => {
  const {isLoading,seIsLoading}=useState(true)
    const navigate=useNavigate();

    const token=localStorage.getItem('token')

     useEffect(() => {
        if (!token) {
          navigate("/captainlogin");
        }
      },[ token ,navigate]);

      if(isLoading){
        return (
         <div></div>
        )
      }
  return (
    <div>{children}</div>
  )
}

export default CaptainProtectWrapper