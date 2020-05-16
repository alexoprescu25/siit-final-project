import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Login.css';
import axios from 'axios';

import AuthContext from './AuthContext';

const errorMessage = {
    'username': 'Please enter your username!',
    'password': 'Please enter your password!'
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

    const history = useHistory();

    const { setToken } = useContext(AuthContext);

    const [globalErrorMessage, setErrorMessage] = useState('');
    const [globalSuccessMessage, setSuccessMessage] = useState('');
    const [isDirty, setDirty] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const isInvalid = validateFormData();
        if(!isInvalid) {
            try {
                const res = await axios('http://localhost:3002/users');
                const db = res.data;
                for(let i in db) {
                    if(db[i]['username'] === formData['username'] && db[i]['password'] === formData['password']) {
                        setSuccessMessage('Welcome back, ' + db[i]['firstname'] + '!');
                        setToken(db[i]['username']);
                        localStorage.setItem('token', db[i]['username']);
                        localStorage.setItem('userId', db[i]['id']);
                        localStorage.setItem('fullname', db[i]['firstname'] + ' ' + db[i]['lastname']);
                        localStorage.setItem('firstname', db[i]['firstname']);
                        setTimeout(() => {
                            history.push('/home');
                        }, 1000);
                    }
                }
            } catch(e) {
                console.log(e);
                setErrorMessage('Your account does not exist!');
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

                    {
                    globalErrorMessage ? 
                    <div className="error-message">
                        { globalErrorMessage }
                    </div> : null
                    }
                    {
                        globalSuccessMessage ? 
                        <div className="success-message">
                            { globalSuccessMessage }
                        </div> : null
                    }

                    <h2>Sing In To Your Account</h2>
                    <input 
                        onChange={ handleInputChange }
                        value={formData.username}
                        type="text"
                        id="username"
                        name="username"
                        className="form-username login-input"
                        placeholder="Username"
                    />
                    <div className="invalid-feedback">
                        { formError.username }
                    </div>
                    <input 
                        onChange={ handleInputChange }
                        value={formData.password}
                        type="password"
                        id="password"
                        name="password"
                        className="form-password login-input"
                        placeholder="Password"
                    />
                    <div className="invalid-feedback">
                        { formError.password }
                    </div>
                    <div className="create-account">
                        <p>Not registered? </p>
                        <Link to="/register">Create an Account</Link>
                    </div>
                    <button type="submit" className="submit-button" disbled={ !isDirty }>Log In</button>
                </form>
            </div>
        </>
    );
}

export default Login;