import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './shared/Header';
import Login from './auth/Login';
import Register from './auth/Register';
import Business from './sections/Business';

function App() {
    return (
        <>
        <BrowserRouter>

            <Header />
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route exact path="/business">
                <Business />
            </Route>

        </BrowserRouter>
        </>
    );
}

export default App;