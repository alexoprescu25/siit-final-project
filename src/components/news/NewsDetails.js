import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Modal from 'react-modal';

import AuthContext from '../auth/AuthContext';
import '../styles/NewsDetails.css';

function NewsDetails() {

    const { newsId } = useParams();
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const { token } = useContext(AuthContext);
    const fullname = localStorage.getItem('fullname');
    const history = useHistory();
    
    const [formData, setFormData] = useState({
        'user': fullname,
        'newsId': newsId,
        'comm': fullname + ': '
    });

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
    } 

    async function getNewsById(id) {
        try {
            const promises = [];
            promises.push(axios('http://localhost:3002/news/' + id).then(res => res.data));
            promises.push(axios('http://localhost:3002/comments?newsId=' + id).then(res => res.data));
            
            const [stiri, comms] = await Promise.all(promises);
            
            setNews(stiri);
            setComments(comms);

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
            });
            setTimeout(window.history.back(), 400);
        } catch(e) {
            console.log(e);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios(`http://localhost:3002/comments`, {
                method: 'POST',
                data: qs.stringify(formData)
            });
        } catch(e) {
            console.log(e);
        }
    }

    function deleteComment(e) {
        axios(`http://localhost:3002/comments/${e.currentTarget.id}`, {
            method: 'DELETE'
        });
    }

    const [modalIsOpen, setIsOpen] = useState(false);
    
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    if(news) {
    return (
        <>

            <Modal
                isOpen={ modalIsOpen }
                onRequestClose={ closeModal }
                className="modal"
            >
                <h3>Are you sure you want to delete this article?</h3>
                <div className="modal-buttons">
                    <button onClick={ closeModal } className="simple-button"> Cancel </button>
                    <button onClick={ handleDelete } className="delete-button"> Delete </button>
                </div>
            </Modal>

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
                            <button className="delete-button" onClick={ openModal }>Delete</button>
                        </div> : null
                    }
                </div>
                { token ?
                    <div>
                        <form onSubmit={ handleSubmit } className="com-input">
                            <input
                                onChange={ handleInputChange }
                                value={ formData['add-new-comment'] }
                                name="add-new-comment"
                                id="comm"
                                className="add-new-comment"
                                placeholder="Add Comment"
                            />
                            <button className="add-button" type="submit">Post</button>
                        </form>
                    </div> : null
                }
                <div>
                    { comments.length ? comments.map(comentariu => (
                        <div className="comments" key={ comentariu.id }> 
                            <p className="com-user"> { comentariu.user } </p>
                            <p className="context"> { comentariu.comm } </p>
                            <div className="com-buttons">
                                <div className="edit-elements">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/>
                                        <path d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z"/>
                                    </svg>
                                    <Link className="edit-link" to={`/comments/editcomment/${comentariu.id}`} >Edit</Link>
                                </div>
                                <div className="edit-elements">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                        <path d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                    <button className="but" id={ comentariu.id } onClick={ deleteComment }>Delete</button>
                                </div>
                            </div> 
                        </div>
                    )) : null }
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