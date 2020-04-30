import React, { useState, useEffect } from 'react';
import '../styles/NewsList.css';
import axios from 'axios';

import NewsCard from './NewsCard';
import EditNews from './EditNews';
import Sidebar from '../shared/sidebar/Sidebar';
import NewsDetails from './NewsDetails';
import Pagination from './Pagination';

function NewsList({ category }) {

    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);

    const indexOfLastPost = currentPage * postsPerPage;
    const inedxOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = news.slice(inedxOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        getNews();
    }, []);

    async function getNews() {
        let url = 'http://localhost:3002/news';
        if(category) {
            url += '?category=' + category
        }
        const res = await axios(url);
        setNews(res.data);
    }

    return (
        <>
            <div className="align">
                <div className="container">
                    <NewsCard posts={ currentPosts } />
                </div>
                <Sidebar />
            </div>
            <Pagination postsPerPage={postsPerPage} totalPosts={news.length} paginate={paginate} />
        </>
    );
}

export default NewsList;