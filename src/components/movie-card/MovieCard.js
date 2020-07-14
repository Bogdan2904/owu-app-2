import React, {useContext} from 'react';
import {Link} from "react-router-dom";

import {DarkThemeContext} from "../../context/DarkThemeContext";

import './MovieCard.scss'
import './MovieCardMedia.scss'

function MovieCard(props) {
    const value = useContext(DarkThemeContext)
    const {isDarkTheme} = value;

    const {movie: {title, id, poster_path}} = props;
    return (
        <div className={`card ${isDarkTheme && 'card-dark-theme'}`}>
            {
                !!poster_path &&
                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card-img-top" alt="img"/>
            }
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <Link to={`/movie-page/${id}`} className="btn btn-primary">Read more info</Link>
            </div>
        </div>
    );
}

export default MovieCard;
