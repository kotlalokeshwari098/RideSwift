module.exports.getEstimatedTime = (distance, vehicleType) => {
    // Default average speeds (in km/h)
    const averageSpeeds = {
        auto: 30,
        motorcycle: 40,
        car: 60
    };

    // Get speed for the vehicleType or fallback to 50 km/h
    const speed = averageSpeeds[vehicleType] || 50;

    // Calculate time in hours
    const timeInHours = distance / speed;

    // Convert to total minutes
    const timeInMinutes = Math.round(timeInHours * 60);

    // Breakdown into hours and minutes (optional)
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;

    return {
        duration: timeInMinutes,
        formatted: `${hours}h ${minutes}min`
    };
};
