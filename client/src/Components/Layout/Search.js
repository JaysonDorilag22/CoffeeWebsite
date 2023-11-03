import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

const Search = () => {

    const [keyword, setKeyword] = useState('');
    let navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <form onSubmit={searchHandler} className="form-control">
            <div className="input-group">
                <input type="text" id="search_field" placeholder="Search" onChange={(e) => setKeyword(e.target.value)} className="input input-bordered w-24 md:w-auto" />
                <div className="input-group-append">
                    <button className="btn"><FaSearch /></button>
                </div>
            </div>
        </form>
    )
}

export default Search