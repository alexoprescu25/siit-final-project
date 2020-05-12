import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Profile.css';
import '../styles/NewsDetails.css';
import Modal from 'react-modal';
import qs from 'qs';

const errorMessage = {
    'old-password': 'Please enter your actual password!',
    'password': 'Please enter your new password!',
    'retype-password': 'Please retype your new password!',
    'different-passwords': 'Please make sure your passwords match!',
    'wrong-password': 'Incorrect password!'
}

function Profile() {

    const [profile, setProfile] = useState([]);
    const userId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        'old-password': '',
        'password': '',
        'retype-password': ''
    });

    const [formError, setFormError] = useState({
        'old-password': '',
        'password': '',
        'retype-password': '',
        'different-passwords': '',
        'wrong-password': ''
    });

    async function getProfile() {
        const res = await axios('http://localhost:3002/users/' + userId);
        setProfile(res.data);
    }

    useEffect(() => {
        getProfile();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const isInvalid = validateFormData();
        if(!isInvalid) {
            try {   
                axios(`http://localhost:3002/users/${userId}`, {
                    method: 'PATCH',
                    data: qs.stringify({
                        'password': formData['password'],
                        'retype-password': formData['retype-password']
                    })
                })
            } catch(e) {
                console.log(e);
            }
        }
    } 

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

        const newError = {
            ...formError,
            [e.currentTarget.id]: ''
        }

        setFormError(newError);
    }

    function validateFormData() {
        const inputs = ['old-password', 'password', 'retype-password'];
        const newError = {...formError};
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessage[input];
                isInvalid = true;
            }
        }

        if(formData.password !== formData['retype-password']) {
            newError['different-passwords'] = errorMessage['different-passwords'];
            isInvalid = true;
        }

        if(formData['old-password'] !== profile.password) {
            newError['wrong-password'] = errorMessage['wrong-password'];
            isInvalid = true;
        }

        setFormError(newError);
        return isInvalid;
    }

    async function handleDeleteAccount() {
        const res = await axios(`http://localhost:3002/users/${userId}`, {
            method: 'DELETE'
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('fullname');
        localStorage.removeItem('firstname');
        setTimeout(() => {
            window.location.assign("/login");
        }, 1000);
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function displayResetForm() {
        document.getElementById("reset-form").style.height = "200px";
    }

    return (
        <>  

        <Modal
           isOpen={ modalIsOpen } 
           onRequestClose={ closeModal }
           className="modal"
        >
                <h3>Are you sure you want to delete your account?</h3>
                <div className="modal-buttons">
                    <button onClick={ closeModal } className="simple-button"> Cancel </button>
                    <button onClick={ handleDeleteAccount } className="delete-button"> Delete </button>
                </div>
        </Modal>

        <div className="profile-container">
            <div className="profile-details">
                <img src={ profile.imageUrl } className="profile-image" alt="Profile" />
                <h2 className="fullname"> { profile.firstname + ' ' + profile.lastname } </h2>
                <div className="informations">
                    <p className="strong">Email: </p>
                    <p className="adress"> { profile.email } </p>  
                </div>
                <div className="informations">
                    <p className="strong">Username: </p>
                    <p className="profile-username"> { profile.username } </p>
                </div>
                <div className="informations">
                    <p className="strong">Address: </p>
                    <p className="adress"> { profile.adress } </p>  
                </div>
                <button className="display-reset-inputs" onClick={ displayResetForm }>
                    Reset Password
                    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.646 7.646a.5.5 0 01.708 0L8 10.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z"/>
                        <path d="M8 4.5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z"/>
                    </svg>
                </button>
                <div className="reset-form" id="reset-form">
                    <form className="reset-password" onSubmit={ handleSubmit }>
                        <input 
                            onChange={ handleInputChange }
                            value={ formData['old-password'] }
                            type="password"
                            id="old-password"
                            name="old-password"
                            placeholder="Old Password"
                        />
                        <div className="invalid-feedback">
                            { formError['old-password'] }
                        </div>
                        <div className="invalid-feedback">
                            { formError['wrong-password'] }
                        </div>
                        <input
                            onChange={ handleInputChange }
                            value={ formData.password } 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="New Password"
                        />
                        <div className="invalid-feedback">
                            { formError.password }
                        </div>
                        <input 
                            onChange={ handleInputChange }
                            value={ formData['retype-password'] }
                            type="password"
                            id="retype-password"
                            name="retype-password"
                            placeholder="Retype New Password"
                        />
                        <div className="invalid-feedback">
                            { formError['retype-password'] }
                        </div>
                        <div className="invalid-feedback">
                            { formError['different-passwords'] }
                        </div>
                        <button className="reset-button">Reset</button>
                    </form>
                </div>
                <button onClick={ openModal } className="delete-account-button"> Delete my account </button>
            </div>
        </div>
        </>
    );
}

export default Profile;