const axios = require("axios");

const getCityLocation = async (city, username) => {
    try {
        const { data } = await axios.get(`https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`);

        // Check if any city data is returned
        if (!data.geonames.length) {
            return {
                message: "No city found with the provided name. Please check your spelling.",
                error: true
            };
        }

        // Extract city information
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
