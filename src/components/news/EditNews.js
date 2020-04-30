import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

function EditNews() {

    const [news, setNews] = useState(null);

    
    const { newsId } = useParams();
    
    function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const res = axios('http://localhost:3002/news/' + newsId, {
                method: 'PATCH',
                data: qs.stringify({'title': news.title})
            })
        } catch(e) {
            console.log(e);
        }
    }
    
    function handleInputChange(e) {
        setNews({ ...news, title: e.currentTarget.value});
    }
    
    useEffect(() => {
        getNewsById(newsId);
    }, [newsId]);

    async function getNewsById(id) {
        try {
        const res = await axios('http://localhost:3002/news/' + id);
        setNews(res.data);
        console.log(res.data);
        } catch(e) {
            console.log(e);
        }
    }

    if(!news) {
        return null;
    } else {
    return (
        <>
        <form onSubmit={ handleSubmit }>
            <input 
                onChange={ handleInputChange }
                value={ news.title }
                type="text"
                id="title"
                name="title"
            />
            <button>Save</button>
        </form>
        </>
    );
    }
}

export default EditNews;