import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../styles/Sidebar.css';

function CovidDates() {

    const [covid, setCovid] = useState({});
    const [globalCovid, setGlobalCovid] = useState({});

    async function getInformations() {
        navigator.geolocation.getCurrentPosition(getCoordonates, console.warn);
        
        async function getCoordonates(data) {
            const lat = data.coords.latitude;
            const long = data.coords.longitude;
            
            const url = `http://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${long}&username=alexoprescu25`;
            const res = await axios(url);
            const country = res.data.countryName;

            const response = await axios(`https://api.covid19api.com/live/country/${country}/status/confirmed/date/2020-03-21T13:13:30Z`);
            setCovid(response.data[response.data.length - 1]);
        }
    }

    async function getGlobal() {
        const res = await axios('https://api.covid19api.com/summary');
        setGlobalCovid(res.data.Global);
    }

    useEffect(() => {
        getGlobal();
    }, []);

    useEffect(() => {
        getInformations();
    }, []);

    return (
        <>
    <table className="covid-table">
        <tbody>
            <tr>
                <th className="cases">World cases</th>
                <th className="cases"> { covid ? covid.Country : 'Local Cases '} </th>
            </tr>
            <tr>
                <th className="confirmed">Total confirmed</th>
                <th className="confirmed">Total confirmed</th>
            </tr>
            <tr>
                <th className="number"> { globalCovid ? globalCovid.TotalConfirmed : null } </th>
                <th className="number"> { covid ? covid.Confirmed : null } </th>
            </tr>
            <tr>
                <th className="deaths">Total deaths</th>
                <th className="deaths">Total deaths</th>
            </tr>
            <tr>
                <th className="number"> { globalCovid ? globalCovid.TotalDeaths : null } </th>
                <th className="number"> { covid ? covid.Deaths : null } </th>
            </tr>
        </tbody>
    </table>

        </>
    );
}

export default CovidDates;