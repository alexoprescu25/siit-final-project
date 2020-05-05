import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import '../styles/AddNews.css';

const errorMessage = {
    'title': 'You must enter the title!',
    'description': 'You must enter the description!',
    'urlToImage': 'Your article must have an image!',
    'content': 'You must enter the content!',
}

function AddNews() {

    let today = new Date();
    const [globalErrorMessage, setErrorMessage] = useState(null);
    const [globalSuccessMessage, setSuccessMessage] = useState(null);
    const [name, setName] = useState('');
    const userId = localStorage.getItem('userId');

    async function getUser() {
        const res = await axios('http://localhost:3002/users/' + userId);
        setName(res.data.firstname + ' ' + res.data.lastname);
    }

    useEffect(() => {
        getUser();
    }, []);

    const [formData, setFormData] = useState({
        'title': '',
        'author': name,
        'description': '',
        'urlToImage': '',
        'publishedAt': today,
        'content': '',
        'category': ''
    });

    const [formError, setFormError] = useState({
        'title': '',
        'description': '',
        'urlToImage': '',
        'content': '',
    });

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

        const newError = {
            ...formError,
            [e.currentTarget.id]: ''
        }

        setFormError(newError);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const isInvalid = validateFormData();
        if(!isInvalid) {
            try {   
                const res = await axios('http://localhost:3002/news', {
                    method: 'POST',
                    data: qs.stringify(formData)
                });
                setSuccessMessage('Your article was added!');
            } catch(e) {
                console.log(e);
                setErrorMessage('Ups! There was an error!');
            }
        }
    }

    function validateFormData() {
        const inputs = ['title', 'description', 'urlToImage', 'content'];
        const newError = {...formError};
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessage[input];
                isInvalid = true;
            }
        }

        setFormError(newError);
        return isInvalid;
    }

    return (
        <>

        {
            globalErrorMessage ? 
            <div className="global-error">
                { globalErrorMessage }
            </div> : null
        }
        {
            globalSuccessMessage ? 
            <div className="global-success">
                { globalSuccessMessage }
            </div> : null
        }

        <div className="add-form">
            <form onSubmit={ handleSubmit }>
                <div className="form-inputs">
                <div className="align-inputs">
                    <input 
                        onChange={ handleInputChange }
                        value={ formData.title }
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        className="add-input"
                    />
                    <div className="invalid-feedback">
                        { formError.title }
                    </div>
                </div>
                <div className="align-inputs">
                    <input 
                        onChange={ handleInputChange }
                        value={ formData.description }
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description"
                        className="add-input"
                    />
                    <div className="invalid-feedback">
                        { formError.description }
                    </div>
                    </div>
                    <div className="align-inputs">
                    <input 
                        onChange={ handleInputChange }
                        value={ formData.urlToImage }
                        type="text"
                        name="urlToImage"
                        id="urlToImage"
                        placeholder="Image URL"
                        className="add-input"
                    />
                    <div className="invalid-feedback">
                        { formError.urlToImage }
                    </div>
                    </div>
                    <select id="category"
                            name="category" 
                            className="form-select"
                            onChange={ handleInputChange }
                            >
                        <option disabled selected>Select</option>
                        <option value="business">Business</option>
                        <option value="romania">Romania</option>
                        <option value="science">Science</option>
                        <option value="tech">Tech</option>
                    </select>
                </div>
                <textarea
                    onChange={ handleInputChange }
                    value={ formData.content }
                    id="content"
                    name="content"
                    placeholder="Write something..."
                    className="form-textarea"
                >

                </textarea>
                <div className="invalid-feedback">
                        { formError.content }
                </div>
                <button className="add-button">Submit</button>
            </form>
        </div>
        </>
    )
}

export default AddNews;