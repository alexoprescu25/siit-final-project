import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Profile.css';

function Profile() {

    const [profile, setProfile] = useState([]);
    const userId = localStorage.getItem('userId');

    async function getProfile() {
        const res = await axios('http://localhost:3002/users/' + userId);
        setProfile(res.data);
    }

    useEffect(() => {
        getProfile();
    }, []);

    async function handleDeleteAccount() {
        const res = await axios(`http://localhost:3002/users/${userId}`, {
            method: 'DELETE'
        });
        window.history.back();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('fullname');
        localStorage.removeItem('firstname');
    }

    return (
        <>
        <div className="profile-container">
            <div className="profile-details">
                <img src={ profile.imageUrl } className="profile-image" />
                <h3 className="fullname"> { profile.firstname + profile.lastname } </h3>
                <p className="profile-username"> { profile.username } </p>
                <p className="adress"> { profile.adress } </p>  
                <Link onClick={ handleDeleteAccount }> Delete my account </Link>
            </div>
        </div>
        </>
    );
}

export default Profile;