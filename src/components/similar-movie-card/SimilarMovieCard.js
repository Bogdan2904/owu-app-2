import React, {Component} from 'react';
import './SimilarMovieCard.scss'
import {Link} from "react-router-dom";
import {withRouter} from 'react-router'

class SimilarMovieCard extends Component {




    render() {
        const {movie: {title, id, popularity, poster_path, backdrop_path, overview, release_date}} = this.props;


        return (
            <div className="similar-card">

                <div className='similar-card-image'>
                    <Link to={`/movie-page/${id}`}><img src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} className="card-img-top" alt="img"/></Link>
                </div>
                <div className='similar-card-info' >
                    {title}
                </div>

            </div>

        );
    }
}

export default withRouter(SimilarMovieCard);
