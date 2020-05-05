import React from 'react';

import CovidDates from './CovidDates';
import Weather from './Weather';
import '../../styles/Sidebar.css';

function RightDetails() {

    const firstname = localStorage.getItem('firstname');

    return (
        <>
            <div className="sidebar">
                <h3 className="welcome"> { firstname ? 'Welcome, ' + firstname + '!' : null } </h3>
                <Weather />
                <CovidDates />
            </div>
        </>
    );
}

export default RightDetails;