import React from "react";
import { Link } from "react-router";
import uberlogo from '../assets/uberlogo.webp'
import mainPic from '../assets/mainpic.avif';


const Home = () => {
  return (
    <div>
      <div>
        <div className="h-screen bg-cover w-full bg-red-400 flex items-start justify-between flex-col " 
        style={{ backgroundImage: `url(${mainPic})` }}>
          <img
            src={uberlogo}
            alt=""
            className="h-19 text-black pt-2 pl-5"
          />
          <div className="bg-white py-5 px-5 w-full">
            <h2 className="text-3xl font-bold">Get started with Uber</h2>
            <Link to='/login'>
              <button className="w-full bg-black text-white py-3 rounded-md mt-3">
              Continue
              </button>
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
