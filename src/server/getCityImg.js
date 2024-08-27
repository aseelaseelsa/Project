const axios = require("axios");

const getCityImg = async (name, key) => {
    console.log("cityimg working");
    try {
        const { data } = await axios.get(`https://pixabay.com/api/?key=${key}&q=${name}&image_type=photo`);
        
        // Check if data.hits has at least one image
        const img = data.hits.length > 0 ? data.hits[0].webformatURL : "https://source.unsplash.com/random/640x480?city,morning,night?sig=1";
        
        console.log(img);
        return { img };
    } catch (error) {
        console.error("Error fetching city image:", error);
        // Fallback image in case of an error
        return { img: "https://source.unsplash.com/random/640x480?city,morning,night?sig=2" };
    }
};

module.exports = { getCityImg };
