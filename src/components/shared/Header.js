import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.css';
import AuthContext from '../auth/AuthContext';
import SearchFilter from '../sections/SearchFilter';

function Header(z) {

    function handleClick() {
        document.querySelector('.page-content').classList.remove('hidden');
    }

    function handleLogOut(e) {
        e.preventDefault();

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('fullname');
        localStorage.removeItem('firstname');
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
                <div className="search-bar">
                    <input 
                        type="text"
                        className="search-input"
                        placeholder="Search News"
                    />
                    <svg className="bi bi-search" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"/>
                        <path d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"/>
                    </svg>
                </div>
                <div className="list-icons">
                    <button onClick={ displayAuth } className="list-btn">
                        <svg className="bi bi-list" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" />
                        </svg>
                    </button>
                    { token ?
                    <button className="list-icons list-btn" onClick={ handleClick }>
                        <svg className="bi bi-three-dots-vertical" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                        </svg>
                    </button> : null
                    }
                </div>
            </div>
            <div className="auth hidden">
            {
                token ?
                <Link onClick={ handleLogOut } to="/">Log Out </Link>
                :
                <>
                <Link to="/login">Login </Link>
                <Link to="/register">Register</Link>
                </>
            }    
            </div>
            <div className="bottom-links">
                <Link to="/" className="home">Home</Link>
                <Link to="/romania">Romania</Link>
                <Link to="/business">Business</Link>
                <Link to="/science">Science</Link>
                <Link to="/tech">Tech</Link>
                <Link to="/search">Search</Link>
            </div>
        </nav>
        </>
    );
}

export default Header;