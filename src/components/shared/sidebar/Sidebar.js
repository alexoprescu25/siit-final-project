import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CovidDates from './CovidDates';
import Weather from './Weather';
import '../../styles/Sidebar.css';

function RightDetails() {

    const firstname = localStorage.getItem('firstname');

    const [news, setNews] = useState([]);

    async function getNews() {
        const res = await axios('http://localhost:3002/news');
        setNews(res.data[res.data.length - 1]);
    }

    useEffect(() => {
        getNews();
    }, []);

    return (
        <>
            <div className="sidebar">
                <h3 className="welcome"> { firstname ? 'Welcome, ' + firstname + '!' : null } </h3>
                <div className="recent">
                    <p className="the-latest">The Latest</p>
                    <Link to={ '/businessnews/' + news.id }><h4 className="news-title"> { news.title } </h4></Link>
                    <img src={ news.urlToImage } alt="img"/>
                </div>
                <Weather />
                <img src='icons/covid-01.png' alt="covid" className='covid-image' />
                <CovidDates />
            </div>
        </>
    );
}

export default RightDetails;