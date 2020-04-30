import React from 'react';

import CovidDates from './CovidDates';
import Weather from './Weather';
import '../../styles/Sidebar.css';

function RightDetails() {

    return (
        <>
            <div className="sidebar">
                <Weather />
                <CovidDates />
            </div>
        </>
    );
}

export default RightDetails;