import React from 'react'

const ConfirmedRide = ({setConfirmRidePanel,setVehiclePanelOpen,setVehicleFound}) => {
  return (
    <div>
        <h5 className="" onClick={()=>{
            setConfirmRidePanel(false)
            setVehiclePanelOpen(false)
           
            }}><i className="ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-3">Confirm your Ride</h3>
        

        <div className='flex justify-between items-center flex-col gap-3'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh5PZ4E5PBYLBwSlIIYPmpkNpYxzRwqdmcVA&s" alt="" className='h-23'/>
          <div className='w-full'>
               <div className='flex items-center gap-3 p-3 border-b-2 border-gray-300'>
                    <i className="ri-map-pin-2-line text-lg"></i>
                    <div>
                      <h3 className='text-lg font-bold'>562/11-8</h3>
                      <p className='text-base text-gray-600'>Kankariya Talab,Bhopal</p>
                    </div>
               </div>
               <div className='flex items-center gap-3 p-3 border-b-2 border-gray-300'>
                    <i className="ri-map-pin-2-line text-lg"></i>
                    <div>
                      <h3 className='text-lg font-bold'>562/11-8</h3>
                      <p className='text-base text-gray-600'>Kankariya Talab,Bhopal</p>
                    </div>
               </div>
               <div className='flex items-center gap-3 p-3 '>
                   <i className="ri-cash-line"></i>
                    <div>
                      <h3 className='text-lg font-bold'>193.20</h3>
                      <p className='text-base text-gray-600'>Cash-cash</p>
                    </div>
               </div>
               
          </div>

        </div>
        <div>
          <button 
          className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg' 
          onClick={()=>{
            setVehicleFound(true) 
            setConfirmRidePanel(false)
          }}>Confirm</button>
        </div>
    </div>
  )
}

export default ConfirmedRide