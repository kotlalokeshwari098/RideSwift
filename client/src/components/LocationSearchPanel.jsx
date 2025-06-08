import React from 'react'

const LocationSearchPanel = ({
   
  suggestions = [], 
  loading, 
  activeField, 
  onSelectLocation
}) => {
  // Fallback locations in case we don't have suggestions yet
  const fallbackLocations = [
    'H.No. 45B, Street No. 2, Behind Kapoors Cafe, EG23',
    '12A, Main Road, Near City Mall, MG12',
    'Flat 301, Sunrise Apartments, Sector 21, GK45',
    'Plot No. 7, Industrial Area, Phase 2, IN88',
    'B-56, Green Park, Opposite Metro Station, GP09'
  ];

  // Display suggestions if available, otherwise use fallback
  const locationsToDisplay = suggestions.length > 0 
    ? suggestions 
    : fallbackLocations.map(address => ({ address }));

  return (
    <div className='flex flex-col gap-3 my-5 mx-2'>
      {loading ? (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {activeField && (
            <div className="text-sm text-gray-600 mb-2 px-2">
              {activeField === 'pickup' ? 'Select pickup location' : 'Select destination'}
            </div>
          )}
          
          {locationsToDisplay.map((item, index) => (
            <div key={index}>
              <div 
                className='flex items-center justify-start gap-5 active:border-black hover:bg-gray-100 border-2 border-gray-400 rounded-xl w-auto p-2'
                onClick={() => onSelectLocation(item)}
              >
                <div className='bg-[#eee] h-8 w-8 rounded-full flex items-center justify-center'>
                  <i className="ri-map-pin-fill text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className='font-medium text-left'>{item.address}</h4>
                </div>
              </div>
            </div>
          ))}
          
          {suggestions.length === 0 && activeField && (
            <div className="text-sm text-gray-500 text-center p-2">
              Type at least 3 characters to see suggestions
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default LocationSearchPanel