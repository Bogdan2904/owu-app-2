import React, {Component} from 'react';
import './MovieCard.scss'
import {Link} from "react-router-dom";

class MovieCard extends Component {

    render() {
        const {movie:{title, id, popularity, poster_path, backdrop_path, overview, release_date}}=this.props;

        return (
                <div className="card">
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
