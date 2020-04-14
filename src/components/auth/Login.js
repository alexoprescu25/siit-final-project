import React, { useState } from 'react';
import '../styles/Login.css';

const errorMessage = {
    'username': 'You must enter the username!',
    'password': 'You must enter the password!'
}

function Login() {

    const [formData, setFormData] = useState({
        'username': '',
        'password': ''
    });

    const [formError, setFormError] = useState({
        'username': '',
        'password': ''
    });

    function handleSubmit(e) {
        e.preventDefault();

        validateFormData();
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
        const inputs = ['username', 'password'];
        const newError = {...formError};
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessage[input];
                isInvalid = true;
            }
        }

        setFormError(newError);
    }

    return (
        <>
            <div className="formular">
                <form className="login-form" onSubmit={ handleSubmit }>
                    <input 
                        onChange={ handleInputChange }
                        value={formData.username}
                        type="text"
                        id="username"
                        name="username"
                        className="form-username"
                        placeholder="Username"
                    />
                    <input 
                        onChange={ handleInputChange }
                        value={formData.username}
                        type="password"
                        id="password"
                        name="password"
                        className="form-password"
                        placeholder="Password"
                    />
                    <div>
                    <input 
                        type="checkbox"
                        id="checkbox"
                        name="checkbox"
                        className="form-checkbox"
                    />
                    <label for="checkbox"> Remember me</label>
                    </div>
                    <button type="submit" className="submit-button">Log In</button>
                </form>
            </div>
        </>
    );
}

export default Login;