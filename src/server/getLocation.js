const axios = require("axios");

// Function to fetch the geographical location (latitude and longitude) of a city
const getCityLocation = async (city, username) => {
    try {
        const { data } = await axios.get(`https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`);
        // Check if any city data was returned
        if (!data.geonames.length) {
            return {
                message: "No city found with the provided name. Please check your spelling.",
                error: true
            };
        }

        const { name, lat, lng } = data.geonames[0];
        console.log(name, lat, lng);

        return { name, lat, lng };

    } catch (error) {
        console.error("Error fetching city location:", error);
        return {
            message: "Failed to retrieve city location. Please try again later.",
            error: true
        };
    }
};

module.exports = { getCityLocation };
