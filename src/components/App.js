import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './shared/Header';
import Login from './auth/Login';
import Register from './auth/Register';
import AuthContext from './auth/AuthContext';
import Contact from './sections/Contact';
import NewsList from './news/NewsList';
import NewsDetails from './news/NewsDetails';
import EditNews from './news/EditNews';
import FrontDetails from './shared/FrontDetails';
import PrivateRoute from './auth/PrivateRoute';
import AddNews from './news/AddNews';

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

            <FrontDetails />
            <Header />
            <Route exact path="/home">
                <NewsList />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route exact path="/business">
                <NewsList category="business" />
            </Route>
            <Route exact path="/science">
                <NewsList category="science"/>
            </Route>
            <Route exact path="/businessnews/:newsId">
                <NewsDetails />
            </Route>
            <PrivateRoute path="/businessnews/editnews/:newsId">
                <EditNews />
            </PrivateRoute>
            <PrivateRoute exact path="/adding">
                <AddNews />
            </PrivateRoute>
            <Route exact path="/contact">
                <Contact />
            </Route>

        </BrowserRouter>

        </AuthContext.Provider>
        </>
    );
}

export default App;