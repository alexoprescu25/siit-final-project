import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.css';
import AuthContext from '../auth/AuthContext';

function Header() {

    function handleLogOut(e) {
        e.preventDefault();

        localStorage.removeItem('token');
        setToken(null);
    }

    function displayAuth() {
        const auth = document.querySelector('.auth');
        if(auth.classList.contains('hidden')) {
            auth.classList.remove('hidden'); 
        } else {
            auth.classList.add('hidden');
        }
    }

    const { token, setToken } = useContext(AuthContext);

    return (
        <>
        <nav className="site-navigation">
            <div className="top-links">
                <h1 className="title">BreakingNews</h1>
                <button onClick={ displayAuth } className="list-btn">
                    <svg className="bi bi-list" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
            <div className="auth hidden">
            {
                token ?
                <Link onClick={ handleLogOut }>Log Out </Link>
                :
                <>
                <Link to="/login">Login </Link>
                <Link to="/register">Register</Link>
                </>
            }   
            </div>
            <div className="bottom-links">
                <Link to="/home" className="home">Home</Link>
                <Link to="/">Coronavirus</Link>
                <Link to="/business">Business</Link>
                <Link to="/">Science</Link>
                <Link to="/">Tech</Link>
                <Link to="/contact">Contact</Link>
                {
                    token ? 
                    <Link to="/profile">Profile</Link>
                    : null
                }
            </div>
        </nav>
        </>
    );
}

export default Header;