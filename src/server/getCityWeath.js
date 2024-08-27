const axios = require("axios");
// Function to fetch weather data based on latitude, longitude, and the number of remaining days
const getWeather = async (lat, lng, Rdays, Key) => {
  if (!Rdays) {
    const errorMsg = {
      message: "Please Enter A Valid Date",
      error: true,
    };

    return errorMsg;
  }
  // Check if Rdays is negative (i.e., date is in the past)
  if (Rdays < 0) {
    const errorMsg = {
      message: "Date Can't Be In The Past",
      error: true,
    };

    return errorMsg;
  }

  try {
    // Fetch current weather data if Rdays is between 1 and 7 days
    if (Rdays > 0 && Rdays <= 7) {
      console.log("im working");
      const { data } = await axios.get(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${Key}`
      );
      // console.log(data.data[0]);
      const { weather, temp } = data.data[0];
      const { description } = weather;
      // console.log(description,temp);
      const weather_data = { description, temp };
      return weather_data;
      // Fetch forecast data if Rdays is greater than 7 days
    } else if (Rdays > 7) {
      const { data } = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${Rdays}&key=${Key}`
      );
      //    console.log(data.data[data.data.length -1]);

      const { weather, temp, app_max_temp, app_min_temp } =
        data.data[data.data.length - 1];
      const { description } = weather;
      const weather_data = { description, temp, app_max_temp, app_min_temp };
      return weather_data;
    }
  } catch (e) {
    console.error("Error fetching weather data:", error);
    return {
      message: "Failed to retrieve weather data. Please try again later.",
      error: true,
    };
  }
};

module.exports = {
  getWeather,
};
