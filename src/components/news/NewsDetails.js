import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../auth/AuthContext';
import '../styles/NewsDetails.css';

function NewsDetails() {

    const { newsId } = useParams();
    const [news, setNews] = useState(null);
    const { token } = useContext(AuthContext);

    async function getNewsById(id) {
        try {
            const res = await axios('http://localhost:3002/news/' + id);
            setNews(res.data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getNewsById(newsId);
    }, [newsId]);

    async function handleDelete(e) {
        e.preventDefault();

        try {
            const res = await axios('http://localhost:3002/news/' + newsId, {
                method: 'DELETE'
            })
        } catch(e) {
            console.log(e);
        }
    }

    if(news) {
    return (
        <>
        <div className="details">
        <div className="news-details">
            <div>
                <h1> 
                    { news.title } 
                </h1>
                <div className="edit">
                {   token ?
                        <Link to={ '/businessnews/editnews/' + news.id } className="edit-btn">Edit</Link>
                        : null
                } 
                </div>
                <div className="bar">
                    <div className="author">
                        { news.author ? news.author : 'Breaking News'}
                    </div>
                </div>
                <img src={ news.urlToImage } alt="image" className="article-image" />
                <p className="content"> { news.content } </p>
                {   token ?
                    <div className="del-itm">
                        <button className="delete-button" onClick={ handleDelete }>Delete</button>
                    </div> : null
                }
            </div>
        </div>
        </div>
        </>
    );
    } else {
        return <h1>Loading...</h1>;
    }
}

export default NewsDetails;