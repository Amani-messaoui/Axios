const express = require ("express");
const axios = require ("axios");
const { application, request } = require("express");
const app = express();
const port =3000;

app.get("/",(req,res)=>{
    res.send("Weather Application");
});

const requestBrazil = axios.get("https://api.openweathermap.org/data/2.5/weather?q=brazil&appid=393e805db5692b6917e70fddddffeb80");
const requestCanada = axios.get("https://api.openweathermap.org/data/2.5/weather?q=canada&appid=393e805db5692b6917e70fddddffeb80");
const requestFrance = axios.get("https://api.openweathermap.org/data/2.5/weather?q=france&appid=393e805db5692b6917e70fddddffeb80");

axios
  .all([requestBrazil, requestCanada, requestFrance])
  .then(axios.spread((Brazil, Canada, France) => {
      console.log(Brazil.data,Canada.data, France.data);
    })
  )
  .catch(errors => {
    console.error(errors);
  });

  app.get("/brazil", (req,res)=>{
    requestBrazil
    .then ((data) =>{
        res.json(data.data);
    })
    .catch((err) => {})
})

app.get("/canada", (req, res) => {
    requestCanada
      .then((data) => {
        res.json(data.data);
      })
      .catch((err) => {});
  });

  app.get("/france", (req, res) => {
    requestFrance
      .then((data) => {
        res.json(data.data);
      })
      .catch((err) => {});
  });

app.listen (port, function(err){
if (err) console.log("server not running");
else console.log("server running....")
});