import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/NewsCard.css';

function NewsCard( { posts } ) {


    return (
        <>
        { posts.map(post => (
            <div className="article" key={ post.id }>
                <Link to={ '/businessnews/' + post.id }><h3 className="news-title"> { post.title } </h3></Link>
                <div className="date">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 0H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                        <path d="M6.5 7a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z"/>
                    </svg>
                    <p className="time"> { post.publishedAt } </p>
                </div>
                <img src={ post.urlToImage } alt="img"/>
                <p className="description"> { post.description } </p>
                <a href={ post.url } className="read-more">Read More</a>
            </div>
            )) }
        

        </>
    );
}

export default NewsCard;