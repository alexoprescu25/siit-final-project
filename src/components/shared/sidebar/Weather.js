import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../styles/Weather.css';

function Weather() {

    const [weather, setWeather] = useState({
        'name': '',
        'temp': '',
        'icon': '',
        'type': ''
    });

    function getLocation() {
        navigator.geolocation.getCurrentPosition(getCoordonates, getRandom);
    }

    async function getCoordonates(data) {
            const lat = data.coords.latitude;
            const long = data.coords.longitude;
            const key = '696dd88412b6e63a0604de6c8b0139cf';
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            const res = await axios(url);
            setWeather({
                'name': res.data.name,
                'temp': res.data.main.temp,
                'icon': res.data.weather[0].icon,
                'type': res.data.weather[0].main
            });
    }

    async function getRandom() {
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=Bucharest,ro&appid=696dd88412b6e63a0604de6c8b0139cf';
        const res = await axios(url);
        setWeather({
            'name': res.data.name,
            'temp': res.data.main.temp,
            'icon': res.data.weather[0].icon,
            'type': res.data.weather[0].main
        });
    }

    useEffect(() => {
        getLocation();
    }, []);


    return (
        <>
        <div className="weather">
            <div className="weather-picture">
                <img src={ weather.icon.length ? ('icons/' + weather.icon + '.png') : null } className="weather-icon" />
            </div>
            <div>
                <h3> { weather.name } </h3>
                <div className="degrees"> { weather.temp ? (weather.temp - 273.15).toFixed(1) : <div className="loader"></div> } </div>
                <p className="weather-type"> { weather.type.length ? weather.type : null } </p>
            </div>
        </div>
        </>
    );
}

export default Weather;