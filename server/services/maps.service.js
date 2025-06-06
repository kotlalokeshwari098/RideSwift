const axios = require('axios');

module.exports.getAddressCordinate = async (req, res) => {
    try {
        const  address  = req;
        console.log(address)
        
        if (!address) {
            return res.status(400).json({ 
                success: false, 
                message: 'Address is required' 
            });
        }
         const url=process.env.NOMINATIM_MAPS
        const response = await axios.get(url, {
            params: {
                q: address,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'RideSwift'
            }
        });

        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            console.log(response.data[0])
            console.log(response.data[0].lat)
            
            return {latitue:lat,longitude:lon};
        } else {
            return {
                message: 'No coordinates found for the provided address'
            };
        }
    } catch (error) {
        console.error('Error getting coordinates:', error);
        return {error: error.message};
    }
}