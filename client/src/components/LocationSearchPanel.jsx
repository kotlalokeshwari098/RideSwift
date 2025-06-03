import React from 'react'

const LocationSearchPanel = ({setVehiclePanel,setPanelOpen}) => {
       

  const locations = [
    'H.No. 45B, Street No. 2, Behind Kapoor’s Cafe, EG23',
    '12A, Main Road, Near City Mall, MG12',
    'Flat 301, Sunrise Apartments, Sector 21, GK45',
    'Plot No. 7, Industrial Area, Phase 2, IN88',
    'B-56, Green Park, Opposite Metro Station, GP09'
  ]

  return (
    <div className='flex flex-col gap-3 my-5 mx-2'>
        {/* this is just a sample data */}
        {locations.map((item,index)=>(
          <div>
            <div key={index} className='flex items-center justify-center gap-5 active:border-black border-2 border-gray-400 rounded-xl w-auto p-2'
            onClick={()=>{
              setVehiclePanel(true)
              setPanelOpen(false)
              }}>
            <h1 className='bg-[#eee] h-5 w-5 rounded-full flex items-center justify-center '><i className="ri-map-pin-fill text-xl"></i></h1>
            <h4 className='font-medium'>{item} </h4>
        </div>
          </div>
        ))}
        
        
        
    </div>
  )
}

export default LocationSearchPanel