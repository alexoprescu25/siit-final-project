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
          <input 
              onChange={ handleInputChange }
              value={filter}  
              type="text"
              id="filter"
              className="search-filter"
              placeholder="Search News"
          />
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