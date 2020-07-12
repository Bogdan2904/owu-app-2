import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'

import {DarkThemeContext} from "../../context/DarkThemeContext";
import {getSingleMovie} from "../../redux/actions/movies-action";
import {getSimilarMovies} from "../../redux/actions/movies-action";
import SimilarMovieCard from "../similar-movie-card/SimilarMovieCard";
import './MoviePage.scss'
import './MoviePageMedia.scss'

class MoviePage extends Component {

    static contextType = DarkThemeContext;

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.movieId !== this.props.match.params.movieId) {
            this.loadingMovie()
        }
    }

    componentDidMount() {
        this.loadingMovie()
    }

    loadingMovie() {
        const idMovie = this.props.match.params.movieId;
        const {getSingleMovie, getSimilarMovies} = this.props;
        getSingleMovie && getSingleMovie(idMovie);
        getSimilarMovies && getSimilarMovies(idMovie);
    }

    render() {
        const {
            original_title,
            genres,
            poster_path,
            overview,
            popularity,
            release_date
        } = this.props.movie;
        const {mySimilarMovies} = this.props;
        const {isDarkTheme} = this.context;

        return (
            <div className={`may-movie-page ${isDarkTheme && 'dark'}`}>
                <div className='may-movie-page-content'>
                    <div className='may-movie-page-content-poster'>
                        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt=""/>
                    </div>
                    {!!this.props.movie &&
                    <div className='may-movie-page-content-info'>
                        <div className='may-movie-page-content-info-border'>
                            <div className='may-movie-page-content-info-title'>{original_title}</div>
                            <div className='may-movie-page-content-info-genres'>

                                <span>Genres:</span>
                                {
                                    !!genres && genres.map(genre => <span key={genre.id}>{genre.name}</span>)
                                }

                            </div>
                            <div className='may-movie-page-content-info-popularity'>
                                Popularity: {popularity}
                            </div>
                            <div className='may-movie-page-content-info-release-date'>
                                Release date:{release_date}
                            </div>
                            <div className='may-movie-page-content-info-overview'>
                                {overview}
                            </div>
                        </div>
                        <div className='may-movie-page-content-info-similar-movies'>
                            {
                                !!mySimilarMovies && mySimilarMovies.map(movie => {
                                    const {backdrop_path} = movie;
                                    if (!!backdrop_path) {
                                        return <SimilarMovieCard class='similar-movie-card' key={movie.id}
                                                                 movie={movie}/>

                                    }
                                })
                            }
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    const {singleMovieReducer: {mySingleMovie}, moviesReducer: {myMovies}} = store;
    return {
        mySimilarMovies: myMovies.results,
        movie: mySingleMovie
    }
};

const mapDispatchToProps = ({
    getSingleMovie,
    getSimilarMovies
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MoviePage));
