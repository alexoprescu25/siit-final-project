import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useParams } from 'react-router-dom';

import '../styles/EditNews.css'

function EditComment() {

    const { commId } = useParams();
    const [comentariu, setComentariu] = useState(null);

    async function getCommentById(id) {
        try {
            const res = await axios(`http://localhost:3002/comments/${id}`);
            setComentariu(res.data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCommentById(commId);
    }, [commId]);

    function handleInputChange(e) {
        setComentariu({
            ...comentariu,
            [e.currentTarget.id]: e.currentTarget.value
        });
    }

    function handleSave(e) {
        e.preventDefault();

        try {
             axios(`http://localhost:3002/comments/${commId}`, {
                method: 'PATCH',
                data: qs.stringify({
                    'comm': comentariu.comm
                })
            });
            setTimeout(window.history.back(), 400);
        } catch(e) {
            console.log(e);
        }
    }

    if(!comentariu) {
        return null;
    } else {
    return (
        <>
            <input 
                onChange={ handleInputChange }
                value={ comentariu.comm }
                type="text"
                id="comm"
                name="comm"
                className="edit-form-title"
            />
            <button className="save-button" onClick={ handleSave }>Save</button>
        </>
    );
    }
}

export default EditComment;