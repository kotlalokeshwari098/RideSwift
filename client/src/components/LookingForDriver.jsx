import React from "react";

const LookingForDriver = ({setVehicleFound}) => {
  return (
    <div>
      <h5 className="" onClick={()=>{
            setVehicleFound(false)
           
            }}><i className="ri-arrow-down-wide-line"></i></h5>
    
      <div className="flex items-center justify-between">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh5PZ4E5PBYLBwSlIIYPmpkNpYxzRwqdmcVA&s" alt="" className="h-17"/>
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
              <p className="text-base text-gray-600">Kankariya Talab,Bhopal</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border-b-2 border-gray-300">
            <i className="ri-map-pin-2-line text-lg"></i>
            <div>
              <h3 className="text-lg font-bold">562/11-8</h3>
              <p className="text-base text-gray-600">Kankariya Talab,Bhopal</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 ">
            <i class="ri-cash-line"></i>
            <div>
              <h3 className="text-lg font-bold">193.20</h3>
              <p className="text-base text-gray-600">Cash-cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
