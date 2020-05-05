import React, { useState, useContext } from 'react';
import  '../styles/Register.css';
import axios from 'axios';
import qs from 'qs';
import AuthContext from './AuthContext';

const errorMessages = {
    'firstname': '*Please enter your first name!',
    'lastname': '*Please enter your last name!',
    'username': '*Please enter your username!',
    'email': '*Please enter a valid email address!',
    'password': '*You must enter your password!',
    'retype-password': '*You must retype your password!',
    'different-passwords': '*You must enter same password twice!',
    'existing': ' already existing!'
}

function Register() {

    const [formData, setFormData] = useState({
        'firstname': '',
        'lastname': '',
        'username': '',
        'email': '',
        'password': '',
        'retype-password': '',
        'imageUrl': '',
        'address': '',
        'birthday': ''
    });

    const [formError, setFormError] = useState({
        'firstname': '',
        'lastname': '',
        'username': '',
        'email': '',
        'password': '',
        'retype-password': '',
        'different-passwords': '',
        'existing': ''
    });

    const [globalErrorMessage, setErrorMessage] = useState('');
    const [globalSuccessMessage, setSuccessMessage] = useState('');
    const [isDirty, setDirty] = useState(false);

    const { setToken } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        const isInvalid = await validateFormData();

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
        setDirty(true);

        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

        const newError = {
            ...formError,
            [e.currentTarget.id]: '',
        }

        setFormError(newError);
    }

    async function validateFormData() {
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

        try {
            const res =  await axios('http://localhost:3002/users');
            const db = res.data;
            for(let i in db) {
                for(const input of ['username', 'email']) {
                    if(db[i][input] === formData[input]) {
                        newError['existing'] = ( '*This ' + input + errorMessages['existing']);
                        isInvalid = true;
                    }
                }
            }
        } catch(e) {
                console.log(e);
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
                <div className="invalid-feedback">
                        { formError['existing'] }
                </div>
            <label for="firstname">
                First Name:
            </label>
            <input 
                    onChange={ handleInputChange }
                    value={ formData.firstname }
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="form-firstname register-input"
                    placeholder="First Name"
                />
                <div className="invalid-feedback">
                    { formError.firstname }
                </div>
                <label for="lastname">
                Last Name:
                </label>
                <input 
                    onChange={ handleInputChange }
                    value={ formData.lastname }
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="form-lastname register-input"
                    placeholder="Last Name"
                />
                <div className="invalid-feedback">
                    { formError.lastname }
                </div>
                <label for="username">
                    Username
                </label>
                <input 
                    onChange={ handleInputChange }
                    value={ formData.username }
                    type="text"
                    name="username"
                    id="username"
                    className="form-username register-input"
                    placeholder="Username"
                />  
                <div className="invalid-feedback">
                    { formError.username }
                </div>
                <label for="email">
                    Email:
                </label>
                <input 
                    onChange={ handleInputChange }
                    value={ formData.email }
                    type="email"
                    name="email"
                    id="email"
                    className="form-email register-input"
                    placeholder="Email"
                />  
                <div className="invalid-feedback">
                    { formError.email }
                </div>
                <label for="password">
                    Password:
                </label>
                <input 
                    onChange={ handleInputChange }
                    value={ formData.password }
                    type="password"
                    name="password"
                    id="password"
                    className="form-password register-input"
                    placeholder="Password"
                />
                <div className="invalid-feedback">
                    { formError.password }
                </div>
                <label for="retype-password">
                    Confirm Password
                </label>
                <input 
                    onChange={ handleInputChange }
                    value={ formData['retype-password'] }
                    type="password"
                    name="retype-password"
                    id="retype-password"
                    className="form-retype-password register-input"
                    placeholder="Retype Password"
                />
                <label for="address">
                    Address:
                </label>
                <input 
                    onChange={ handleInputChange }
                    value={ formData.adress }
                    type="text"
                    name="address"
                    id="address"
                    className="form-adress register-input"
                    placeholder="Adress"
                /> 
                <label for="imageUrl">
                    Image:
                </label>
                <input 
                    onChange={ handleInputChange }
                    value={ formData.imageUrl }
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    className="form-imageUrl register-input"
                    placeholder="Image URL"
                /> 
                <label for="birthday">
                    Birthday:
                </label>
                <input 
                    onChange={ handleInputChange }
                    value={ formData.birthday }
                    type="text"
                    name="birthday"
                    id="birthday"
                    className="form-birthday register-input"
                    placeholder="Birthday"
                /> 
                <div className="invalid-feedback">
                    { formError['retype-password'] }
                </div>
                <button type="submit" className="submit-button" disabled={ !isDirty }>Register</button>
            </form>
            </div>
        </>
    );
}

export default Register;