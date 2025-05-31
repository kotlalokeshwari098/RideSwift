import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";

const CaptainLogin = () => {
  const {captain,setCaptain}=useContext(CaptainDataContext)
  const navigate=useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  console.log(captain)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const response=await axiosInstance.post('/captain/login',form)
    
    if(response){
      setCaptain(response.data.captain)
      localStorage.setItem('token',response.data.token)
      navigate('/captainhome')
      setForm({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="p-5 flex flex-col justify-between h-screen">
      <div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/027/127/594/non_2x/uber-logo-uber-icon-transparent-free-png.png"
          alt=""
          className="h-16 text-black mb-2"
        />
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h3 className="mb-2 text-lg font-medium">What's your email</h3>

          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            className="bg-[#eeeeee] rounded px-4 py-2 placeholder:text-base mb-7 w-full"
            placeholder="example@email.com"
          />

          <h3 className="mb-2 text-lg font-medium">Enter Password</h3>
          <input
            type="password"
            placeholder="password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            className="bg-[#eeeeee] rounded px-4 py-2 mb-7 w-full"
          />

          <button className="bg-[#111] rounded px-4 py-2 text-white mt-2">
            Login
          </button>
           <p className="my-5 text-center ">
         Join a fleet?{" "}
          <Link to="/captainsignup" className="text-blue-600">
            Register as a Caption
          </Link>
        </p>
        </form>
      </div>
      <div>
       
        <Link to='/login'>
          <button className="bg-[#f3c164] rounded px-4 py-2 text-white  w-full">
            Sign in as user
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
