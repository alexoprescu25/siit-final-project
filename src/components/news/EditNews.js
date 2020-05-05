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
                    'content': news.content
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
        <div className="edit-form">
                <form onSubmit={ handleSubmit }>
                <div className="edit-inputs">
                    <h1> { news.title } </h1>
                    <input 
                        onChange={ handleInputChange }
                        value={ news.title }
                        type="text"
                        id="title"
                        name="title"
                        className="edit-form-title"
                    />
                    <textarea
                        onChange={ handleInputChange }
                        value={ news.content }
                        name="content"
                        id="content"
                        className="edit-form-content"
                    >

                    </textarea>
                    </div>
                    <button className="save-button">Save</button>
                </form>
        </div>
        </>
    );
    }
}

export default EditNews;