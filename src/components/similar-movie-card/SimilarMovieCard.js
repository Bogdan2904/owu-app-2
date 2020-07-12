import React, {Component} from 'react';
import {withRouter} from 'react-router'
import {Link} from "react-router-dom";

import {DarkThemeContext} from "../../context/DarkThemeContext";
import './SimilarMovieCard.scss'
import './SimilarMovieCardMedia.scss'

class SimilarMovieCard extends Component {
    static contextType = DarkThemeContext;
    render() {
        const {isDarkTheme} = this.context;
        const {movie: {title, id, backdrop_path}} = this.props;
        return (
            <div className="similar-card">
                <Link className='link' to={`/movie-page/${id}`}>
                    <div className='similar-card-image'>
                        <img src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} className="card-img-top"
                             alt="img"/>
                    </div>
                    <div className={`similar-card-info ${isDarkTheme && 'dark-card-info'}`}>
                        {title}
                    </div>
                </Link>
            </div>
        );
    }
}

export default withRouter(SimilarMovieCard);
