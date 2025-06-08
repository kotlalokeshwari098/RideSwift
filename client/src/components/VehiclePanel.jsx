import React from "react";

const VehiclePanel = (props) => {
  // const vehiclesInfo=[{
  //     img:
  // }]
  return (
    <div>
      <h5
        className=""
        onClick={() => {
          props.setVehiclePanelOpen(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3">Choose a Vehicle</h3>
      <div
        className="flex items-center justify-between gap-3 w-full border-2  rounded-xl p-2  active:border-black mb-2 border-gray-200"
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehicleType('car')
        }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh5PZ4E5PBYLBwSlIIYPmpkNpYxzRwqdmcVA&s"
          alt=""
          className="h-14"
        />
        <div className="w-1/2">
          <h3 className="font-medium text-base">
            RideGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>{" "}
          </h3>
          <h5 className="font-medium text-sm">2 mins away </h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-2xl font-semibold">₹{props.fare.car}</h2>
      </div>
      <div
        className="flex items-center justify-between gap-3 w-full border-2  rounded-xl p-2 mb-2 active:border-black border-gray-200"
        onClick={() => {
          props.setConfirmRidePanel(true);
           props.setVehicleType('moto')
        }}
      >
        <img
          src="https://isakaabengaluru.s3.ap-south-1.amazonaws.com/wp-content/uploads/2023/05/13134245/Grey-2.webp"
          alt=""
          className="h-14"
        />
        <div className="w-1/2 ml-6">
          <h3 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>{" "}
          </h3>
          <h5 className="font-medium text-sm">3 mins away </h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable, Motorcycle rides
          </p>
        </div>
        <h2 className="text-2xl font-semibold">₹{props.fare.moto}</h2>
      </div>
      <div
        className="flex items-center justify-between gap-3 w-full border-2 active:border-black rounded-xl p-2 mb-2 border-gray-200 "
        onClick={() => {
          props.setConfirmRidePanel(true);
           props.setVehicleType('auto')
        }}
      >
        <img
          src="https://imgd.aeplcdn.com/600x337/n/cw/ec/124027/hyryder-exterior-right-front-three-quarter-73.jpeg?isig=0&q=80"
          alt=""
          className="h-12"
        />
        <div className="w-1/2">
          <h3 className="font-medium text-base">
            Uber Auto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>{" "}
          </h3>
          <h5 className="font-medium text-sm">9 mins away </h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-2xl font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
