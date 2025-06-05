import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainProtectWrapper = ({ children }) => {
  const { Captain, setCaptain } = useContext(CaptainDataContext);
  const [ isLoading, setIsLoading ] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/captainlogin");
    }
  }, [token, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/captain/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCaptain(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        localStorage.removeItem("token");
        navigate("/captainlogin");
      }
    })();
  },[token,setCaptain,navigate]);

  if (isLoading) {
    return <div>laoding...</div>;
  }
  return <div>{!isLoading && children}</div>;
};

export default CaptainProtectWrapper;
