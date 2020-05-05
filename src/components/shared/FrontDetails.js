import React from 'react';
import '../styles/FrontDetails.css';
import { Link } from 'react-router-dom';

function FrontDetails() {

    function handleExit() {
        document.querySelector('.page-content').classList.add('hidden');
    }

    return (
        <>
        <nav className="page-content hidden">
            <div className="page-style">
                <div className="exit-path">
                    <button className="exit-button sidebar-link" onClick={ handleExit }>
                    <svg className="bi bi-x" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"/>
                        <path d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"/>
                    </svg>
                    </button>
                </div>

                <div className="profile-path">
                    <svg className="bi bi-plus" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z"/>
                        <path d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z"/>
                    </svg>
                    <Link to="/adding" className="sidebar-link">Add News</Link>
                </div>

                <div className="profile-path">
                    <svg className="bi bi-person" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <Link to="/profile" className="sidebar-link">Profile</Link>
                </div>
            </div>
        </nav>
        </>
    );
}

export default FrontDetails;