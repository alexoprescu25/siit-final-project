import React, { useState, useEffect, useContext } from 'react';
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

    return (
        <>
        <div className="profile-container">
            <div className="profile-details">
                <img src={ profile.imageUrl } className="profile-image" />
                <h3 className="fullname"> { profile.firstname + profile.lastname } </h3>
                <p className="profile-username"> { profile.username } </p>
                <p className="adress"> { profile.adress } </p>  
            </div>
        </div>
        </>
    );
}

export default Profile;