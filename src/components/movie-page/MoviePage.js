import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import {getSingleMovie} from "../../redux/actions/movies-action";
import {getSimilarMovies} from "../../redux/actions/movies-action";
import SimilarMovieCard from "../similar-movie-card/SimilarMovieCard";

import './MoviePage.scss'
import MovieCard from "../movie-card/MovieCard";

class MoviePage extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.match.params.movieId !== this.props.match.params.movieId){
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
            backdrop_path,
            genres,
            poster_path,
            overview,
            popularity,
            production_companies,
            production_countries,
            release_date,
            video
        } = this.props.movie;
        console.log(this.props.movie);
        const {mySimilarMovies} = this.props;
        return (
            <div className='may-movie-page'>

                <div className='may-movie-page-poster'>
                    <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt=""/>
                </div>

                <div className='may-movie-page-info'>
                    <div className='may-movie-page-info-border'>
                        <div className='may-movie-page-info-title'>{original_title}</div>
                        <div className='may-movie-page-info-genres'>

                            {
                                !!genres && genres.map(genre => <span key={genre.id}>{genre.name}</span>)
                            }

                        </div>
                        <div className='may-movie-page-info-popularity'>
                            Popularity: {popularity}
                        </div>
                        <div className='may-movie-page-info-overview'>
                            {overview}
                        </div>
                    </div>

                    <div className='may-movie-page-info-similar-movies'>
                        {
                            !!mySimilarMovies && mySimilarMovies.map(movie => {
                                return <SimilarMovieCard class='similar-movie-card' key={movie.id} movie={movie}/>
                            })
                        }
                    </div>
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
