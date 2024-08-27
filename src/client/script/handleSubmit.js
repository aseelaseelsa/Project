import axios from 'axios';
import { getRdays } from './getRdays';
import Swal from 'sweetalert2';

// Select form and input elements from the DOM

const form = document.querySelector('form');
const cityInput = document.querySelector("#city");
const dateInput = document.getElementById('date');

// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    const Location = await getCity();

      // Validate inputs
    if (cityInput.value === "") {
        clearUI();// Clear the UI if city is not provided
        Swal.fire("Please Choose a City Name.");// Show an error alert
        return false;
    } else if(Location.error){
        clearUI();
        Swal.fire(`${Location.message}`);
        return false;

    }else if (dateInput.value === "" ) {
        clearUI();
        Swal.fire("Please Choose a Date.");
        return false;
    } else if(getRdays(dateInput.value) < 0){
        dateInput.value = ""; // Clear the date input
        clearUI();
        Swal.fire("The Date Can't Have Past, Please Choose an Upcoming Date");
        return false;
    }

    else {
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Come on!",
            showConfirmButton: false,
            timer: 1300
        });
    }


    const { name, lng, lat } = Location;
    const date = dateInput.value;
    const Rdays = getRdays(date);

  // Fetch weather data
    const Weather = await getWeather(lng, lat, Rdays);
   
    // Handle weather data errors
    if(Weather.error){
        dateInput.value = ""; // Clear the date input
        clearUI();
        Swal.fire(`${Weather.message}`);
        return false;
    }
    if(Rdays < 0){
        dateInput.value = ""; // Clear the date input
        clearUI();
        Swal.fire("The Date Can't Have Past");
        return false;
    }
     // Fetch city image
    const image = await getCityImg(name);
    updateUI(Rdays, name, image.img, Weather);
};

// Function to clear the UI elements
const clearUI = () => {
    document.querySelector("#Rdays").innerHTML = "";
    document.querySelector(".NameOfCity").innerHTML = "";
    document.querySelector(".weatherOfCity").innerHTML = "";
    document.querySelector(".temperature").innerHTML = "";
    document.querySelector(".max-temperature").innerHTML = "";
    document.querySelector(".min-temperature").innerHTML = "";
    document.querySelector(".cityImg").innerHTML = "";
    document.querySelector(".flight_data").style.display = "none";
};

// Function to get city information from the server
const getCity = async () => {
    const { data } = await axios.post("http://localhost:8000/getCity", form, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return data;
};

// const getRdays = (date) => {
//     const datenow = new Date();
//     const travelDate = new Date(date);
//     const timeDif = travelDate.getTime() - datenow.getTime();
//     const Rdays = Math.ceil(timeDif / (1000 * 3600 * 24));
//     return Rdays;
// };

// Function to get weather information from the server
const getWeather = async (lng, lat, Rdays) => {
    const { data } = await axios.post("http://localhost:8000/getWeather", {
        lng,
        lat,
        Rdays
    });
    return data;
};

// Function to get an image of the city from the server
const getCityImg = async (name) => {
    const { data } = await axios.post("http://localhost:8000/getImg", { name });
    return data;
};

// Function to update the UI with weather and city information
const updateUI = (Rdays, city, image, weather) => {
    document.querySelector("#Rdays").innerHTML = `Your journey begins in just ${Rdays} days - get ready for an exciting adventure!`;
    document.querySelector(".NameOfCity").innerHTML = `Location: ${city}`;
    document.querySelector(".weatherOfCity").innerHTML = Rdays > 7 ? `Weather is: ${weather.description}` : `Weather is expected to be: ${weather.description}`;
    document.querySelector(".temperature").innerHTML = Rdays > 7 ? `Forecast: ${weather.temp}&degC` : `City Temperature: ${weather.temp} &deg C`;
    document.querySelector(".max-temperature").innerHTML = Rdays > 7 ? `Maximum-Temperature: ${weather.app_max_temp}&degC` : "";
    document.querySelector(".min-temperature").innerHTML = Rdays > 7 ? `Minimum-Temperature: ${weather.app_min_temp}&degC` : "";
    document.querySelector(".cityImg").innerHTML = `<img src="${image}" alt="An image that describes the city's nature">`;
    document.querySelector(".flight_data").style.display = "block";
};

export { handleSubmit };
