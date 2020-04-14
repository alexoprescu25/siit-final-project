import React, { useState, useContext } from 'react';
import  '../styles/Register.css';
import axios from 'axios';
import qs from 'qs';
import AuthContext from './AuthContext';

const errorMessages = {
    'firstname': 'You must enter your first name!',
    'lastname': 'You must enter your last name!',
    'username': 'You must enter your username!',
    'email': 'You must enter your email!',
    'password': 'You must enter your password!',
    'retype-password': 'You must retype your password!',
    'different-passwords': 'You must enter same password twice!'
}

function Register() {

    const [formData, setFormData] = useState({
        'firstname': '',
        'lastname': '',
        'username': '',
        'email': '',
        'password': '',
        'retype-password': ''
    });

    const [formError, setFormError] = useState({
        'firstname': '',
        'lastname': '',
        'username': '',
        'email': '',
        'password': '',
        'retype-password': '',
        'different-passwords': ''
    });

    const [globalErrorMessage, setErrorMessage] = useState('');
    const [globalSuccessMessage, setSuccessMessage] = useState('');
    const [isDirty, setDirty] = useState(false);

    const { setToken } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        const isInvalid = validateFormData();

        if(!isInvalid) {
            try {
                const res = await axios('http://localhost:3002/users', {
                    method: 'POST',
                    data: qs.stringify(formData),
                });
                setToken(formData.username);
                localStorage.setItem('token', formData.username);
                setSuccessMessage('Your username was created!');
                console.log(res);
            } catch(e) {
                console.log(e);
                setErrorMessage('Your username was not created!');
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
        const inputs = ['firstname', 'lastname', 'username', 'email', 'password', 'retype-password'];
        const newError = {...formError};
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        if(formData.password !== formData['retype-password']) {
            newError['different-passwords'] = errorMessages['different-passwords'];
            isInvalid = true;
        }

        setFormError(newError);
        return isInvalid;
    }

    return (
        <>

        {
            globalErrorMessage ? 
            <div className="global-error">
                { globalErrorMessage }
            </div> : null
        }
        {
            globalSuccessMessage ?
            <div className="global-success">
                { globalSuccessMessage }
            </div> : null
        }

            <div className="formular">
            <form className="form-cls" onSubmit={ handleSubmit }>
            <input 
                    onChange={ handleInputChange }
                    value={ formData.firstname }
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="form-firstname"
                    placeholder="First Name"
                />
                <div className="invalid-feedback">
                    { formError.firstname }
                </div>
                <input 
                    onChange={ handleInputChange }
                    value={ formData.lastname }
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="form-lastname"
                    placeholder="Last Name"
                />
                <div className="invalid-feedback">
                    { formError.lastname }
                </div>
                <input 
                    onChange={ handleInputChange }
                    value={ formData.username }
                    type="text"
                    name="username"
                    id="username"
                    className="form-username"
                    placeholder="Username"
                />  
                <div className="invalid-feedback">
                    { formError.username }
                </div>
                <input 
                    onChange={ handleInputChange }
                    value={ formData.email }
                    type="email"
                    name="email"
                    id="email"
                    className="form-email"
                    placeholder="Email"
                />  
                <div className="invalid-feedback">
                    { formError.email }
                </div>
                <input 
                    onChange={ handleInputChange }
                    value={ formData.password }
                    type="password"
                    name="password"
                    id="password"
                    className="form-password"
                    placeholder="Password"
                />
                <div className="invalid-feedback">
                    { formError.password }
                </div>
                <input 
                    onChange={ handleInputChange }
                    value={ formData['retype-password'] }
                    type="password"
                    name="retype-password"
                    id="retype-password"
                    className="form-retype-password"
                    placeholder="Retype Password"
                />
                <div className="invalid-feedback">
                    { formError['retype-password'] }
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>
            </div>
        </>
    );
}

export default Register;