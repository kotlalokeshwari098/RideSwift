import React from 'react'
import axiosInstance from '../api/axiosConfig'
import { useNavigate } from 'react-router'

const CaptainLogout = () => {
    const token=localStorage.getItem('token')
    const navigate=useNavigate();

    axiosInstance.get('/captain/logout',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status==200){
            localStorage.removeItem('token')
            navigate('/captainlogin')
        }
    })
  return (
    <div>UserLogout</div>
  )
}

export default CaptainLogout