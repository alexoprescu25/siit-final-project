import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/NewsCard.css';

function NewsCard( { posts } ) {


    return (
        <>
        { posts.map(post => (
            <div className="article">
                <Link to={ '/businessnews/' + post.id }><h3> { post.title } </h3></Link>
                <p className="time"> { post.publishedAt } </p>
                <img src={ post.urlToImage } alt="img"/>
                <p className="description"> { post.description } </p>
                <a href={ post.url } className="read-more">Read More</a>
            </div>
            )) }
        

        </>
    );
}

export default NewsCard;