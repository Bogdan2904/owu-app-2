import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './MovieCard.scss'
import {DarkThemeContext} from "../../context/DarkThemeContext";


class MovieCard extends Component {
    static contextType = DarkThemeContext;

    render() {
        const {movie:{title, id, popularity, poster_path, backdrop_path, overview, release_date}}=this.props;
        const {isDarkTheme} = this.context;
        return (
                <div className={`card ${isDarkTheme && 'sss'}`}>
                    {
                        poster_path && <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card-img-top" alt="img"/>

                    }
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <Link to={`/movie-page/${id}`} className="btn btn-primary">Read more info</Link>
                            </div>
                </div>

        );
    }
}

export default MovieCard;
