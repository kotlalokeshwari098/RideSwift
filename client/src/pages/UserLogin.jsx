import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const response = await axiosInstance.post("/user/login", form);
    console.log(response);

    if (response) {
      setUser(response.data.user);
      localStorage.setItem("token",response.data.token)
      navigate("/home");
    }
    setForm({
      email: "",
      password: "",
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
          <p className="my-3 text-center">
            New here?{" "}
            <Link to="/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to="/captainlogin">
          <button className="bg-[#10b461] rounded px-4 py-2 text-white  w-full">
            Sign in as captain
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
