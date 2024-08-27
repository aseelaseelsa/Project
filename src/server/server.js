
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const {getCityLocation} = require("./getLocation");
const {getWeather} = require("./getCityWeath");
const{getCityImg}= require("./getCityImg");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'))


port = 8000;






const username = process.env.APP_USERNAME;
// console.log(username);
const weather_Key =  process.env.WEATHER_KEY;
// console.log(weather_Key);

const pixabay_key = process.env.PIXABAY_KEY;
// console.log(pixabay_key);


app.get("/", (req, res) => {
    res.render("index.html")
  })


app.post("/getCity",async(req,res)=>{
    // console.log(req.body);
    const {city} = req.body;
    // console.log(city , date);
    const Location = await getCityLocation(city , username);

    // console.log(Location);
    res.send(Location);

  })




  app.post("/getWeather",async(req,res)=>{
  
    // console.log(req.body);
    const {lat,lng,Rdays} = req.body;
 const weatherForCity = await getWeather(lat,lng,Rdays,weather_Key);
  
res.send(weatherForCity);




  })



  
  app.post("/getImg",async(req,res)=>{
  
    const {name} = req.body;
    console.log(name);
 const Image = await getCityImg(name,pixabay_key);
  console.log(Image);
res.send(Image);




  })

app.listen(8000, () => console.log(`server is listening on port ${port}`))