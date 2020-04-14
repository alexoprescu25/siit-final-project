import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './shared/Header';
import Login from './auth/Login';
import Register from './auth/Register';
import Business from './sections/Business';
import AuthContext from './auth/AuthContext';
import Profile from './sections/Profile';
import Contact from './sections/Contact';
import Home from './sections/Home';
import RightDetails from './shared/RightDetails';

function App() {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setToken(token);
        }
    }, []);

    return (
        <>
        <AuthContext.Provider value={ { token, setToken } }>
        <BrowserRouter>

            <Header />
            <RightDetails />
            <Route exact path="/home">
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route exact path="/business">
                <Business />
            </Route>
            <Route exact path="/contact">
                <Contact />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>

        </BrowserRouter>
        </AuthContext.Provider>
        </>
    );
}

export default App;