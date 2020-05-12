import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import '../styles/EditNews.css';

function EditNews() {

    const [news, setNews] = useState(null);
    const { newsId } = useParams();
    
    function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const res = axios('http://localhost:3002/news/' + newsId, {
                method: 'PATCH',
                data: qs.stringify({
                    'title': news.title,
                    'content': news.content,
                    'urlToImage': news.urlToImage
                })
            });
            setTimeout(window.history.back(), 300);
        } catch(e) {
            console.log(e);
        }
    }
    
    function handleInputChange(e) {
        setNews({ 
            ...news,
            [e.currentTarget.id]: e.currentTarget.value
        });
    }
    
    useEffect(() => {
        getNewsById(newsId);
    }, [newsId]);

    async function getNewsById(id) {
        try {
            const res = await axios('http://localhost:3002/news/' + id);
            setNews(res.data);
        } catch(e) {
            console.log(e);
        }
    }

    if(!news) {
        return null;
    } else {
    return (
        <>

        <div className="details">
            <div className="news-details">
                <form onSubmit={ handleSubmit }>
                <div>
                    <h1> 
                        { news.title } 
                    </h1>
                    <input 
                            onChange={ handleInputChange }
                            value={ news.title }
                            type="text"
                            id="title"
                            name="title"
                            className="edit-form-title"
                    />
                    <div className="edit">
                    </div>
                    <div className="bar">
                        <div className="author">
                            { news.author ? news.author : 'Breaking News'}
                        </div>
                    </div>
                    <img src={ news.urlToImage } alt="image" className="article-image" />
                    <input 
                            onChange={ handleInputChange }
                            value={ news.urlToImage }
                            type="text"
                            id="urlToImage"
                            name="urlToImage"
                            className="edit-form-image"
                    />
                    <textarea
                            onChange={ handleInputChange }
                            value={ news.content }
                            name="content"
                            id="content"
                            className="edit-form-content"
                    ></textarea>
                </div>
                <button className="save-button">Save</button>
                </form>
                </div>
                </div> 
        </>
    );
    }
}

export default EditNews;