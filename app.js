import express from 'express'
import dotenv from 'dotenv'
import request from 'request'

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.get('/weather', (req, res) => {

    const apiKey = process.env.API_KEY;

    const city = req.query.city;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    request(url, (err, respons, body) => {
        if (err) {
            console.error(err);
            res.statusCode(400).send({err: 'error'})
        } else {    
            const data = JSON.parse(body);
            const temperature = data.main.temp;
            const cityName = data.name;
            const country = data.sys.country;
            const weatherInfo = `${cityName}, ${country}: ${temperature}°C`;
            res.send(weatherInfo); 
        }
    })
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
