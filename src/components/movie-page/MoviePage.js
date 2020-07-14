import React, {useContext, useEffect} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import {MDBProgress} from 'mdbreact';

import {DarkThemeContext} from "../../context/DarkThemeContext";
import {getSingleMovie} from "../../redux/actions/movies-action";
import {getSimilarMovies} from "../../redux/actions/movies-action";
import SimilarMovieCard from "../similar-movie-card/SimilarMovieCard";

import './MoviePage.scss'
import './MoviePageMedia.scss'

function MoviePage(props) {
    const {movie, mySimilarMovies, getSingleMovie, getSimilarMovies, match: {params: {movieId}}} = props

    const value = useContext(DarkThemeContext)
    const {isDarkTheme} = value;

    useEffect(() => {
        loadingMovie()
    }, [movieId])

    useEffect(() => {
        loadingMovie()
    }, [])

    const loadingMovie = () => {
        getSingleMovie && getSingleMovie(movieId);
        getSimilarMovies && getSimilarMovies(movieId);
    }

    const {
        original_title,
        genres,
        poster_path,
        overview,
        popularity,
        release_date,
        vote_count
    } = movie;
    return (
        <div className={`may-movie-page ${isDarkTheme && 'may-movie-page-dark'}`}>
            <div className='may-movie-page-content'>
                <div className='may-movie-page-content-poster'>
                    <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt=""/>
                </div>
                {!!props.movie &&
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
                            <div className='may-movie-page-content-info-popularity-votes'>
                                <span>Popularity:</span>
                                <span>Vote count:{vote_count}</span>
                            </div>
                            <MDBProgress material value={popularity} height="15px">
                                {popularity}
                            </MDBProgress>
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
