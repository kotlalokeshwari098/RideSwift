import React from "react";
import { Link } from "react-router";

const Riding = () => {
  return (
    <div className="h-screen">
        <Link to='/home'>
           <div className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-2 top-2">
            <i className="ri-home-3-fill text-lg font-medium"></i>
        </div>
        
        </Link>
        
      <div className="h-1/2">
        <img
          src="https://preview.redd.it/ty09jdaxkdf91.jpg?width=1080&crop=smart&auto=webp&s=06db6609ba80d8d3017a66a7f3d2f8932bd2321f"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh5PZ4E5PBYLBwSlIIYPmpkNpYxzRwqdmcVA&s"
            alt=""
            className="h-17"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Deepak</h2>
            <h4 className="text-xl font-semibold -mt-1">MOI TY-89</h4>
            <p className="text-sm text-gray-600">Maruthi Suzuki Atto</p>
          </div>
        </div>
        <div className="flex justify-between items-center flex-col gap-3">
          <div className="w-full">
           
            <div className="flex items-center gap-3 p-3 border-b-2 border-gray-300">
              <i className="ri-map-pin-2-line text-lg"></i>
              <div>
                <h3 className="text-lg font-bold">562/11-8</h3>
                <p className="text-base text-gray-600">
                  Kankariya Talab,Bhopal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 ">
              <i className="ri-cash-line"></i>
              <div>
                <h3 className="text-lg font-bold">193.20</h3>
                <p className="text-base text-gray-600">Cash-cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg' >Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
