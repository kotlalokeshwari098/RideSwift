import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {UserDataContext} from '../context/UserContext'
import { useContext } from "react";
import axiosInstance from "../api/axiosConfig";

const UserRegister = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate=useNavigate();

  const {user,setUser}=useContext(UserDataContext)
  console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const newUser={
      fullname:{
        firstname:form.firstname,
        lastname:form.lastname
      },
      email:form.email,
      password:form.password
    }
    console.log(newUser)

    const response=await axiosInstance.post('/user/register',newUser)
    if(response.status===201){
      const data=response.data;
      setUser(data.user)
      navigate('/home')
    }
    setForm({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    });
  };

  return (
    <div className="p-5 flex flex-col justify-between h-screen">
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaI0-AaIAcwVCkcnR8xdetso-wz9rCOVJB5Q&s"
          alt=""
          className="h-16 text-black mb-2"
        />
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h3 className="mb-2 text-lg font-medium">What's your name</h3>
          <div className="flex gap-4">
            <input
              type="text"
              required
              value={form.firstname}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, firstname: e.target.value }))
              }
              className="bg-[#eeeeee] rounded px-4 py-2 placeholder:text-base mb-7 w-full"
              placeholder="First name"
            />
            <input
              type="text"
              required
              value={form.lastname}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, lastname: e.target.value }))
              }
              className="bg-[#eeeeee] rounded px-4 py-2 placeholder:text-base mb-7 w-full"
              placeholder="Last name"
            />
          </div>

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
            Create Account
          </button>
          <p className="my-3 text-center">
            Already have a account?{" "}
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-xs text-gray-600 text-center mt-4">
          By continuing, you agree to Uber's <span className="underline">Terms of Service</span> and acknowledge that you have read the <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
