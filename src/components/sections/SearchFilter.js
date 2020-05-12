import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/NewsList.css';

    function SearchFilter() {
  
        const [filter, setFilter] = useState('');
        const [data, setData] = useState([]);

        const lowercasedFilter = filter.toLowerCase();

        const filteredData = data.filter(item => {
            return item.title.toLowerCase().includes(lowercasedFilter);
        })

        function handleInputChange(e) { 
            setFilter(e.currentTarget.value);
        }

        async function getData() {
            const res = await axios('http://localhost:3002/news');
            setData(res.data);
        }

        useEffect(() => {
            getData();
        }, []);

      return (
        <div>
          <div className="search-flex">
            <input 
                onChange={ handleInputChange }
                value={filter}  
                type="text"
                id="filter"
                className="search-filter"
                placeholder="Search News"
            />
            <svg className="bi bi-search" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"/>
                <path d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"/>
            </svg>
          </div>
          <nav className="box">
            <div className="container">
              {filteredData.map(item => (
                <div key={item.id}>
                  <div className="container">
                    <div className="article">
                      <Link to={ '/businessnews/' + item.id }> <h3> {item.title} </h3> </Link>
                      <img src={ item.urlToImage } alt="img"/>
                      <p className="description"> { item.description } </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </div>
      );
    }

  export default SearchFilter;