import React, {useContext, useEffect} from 'react'
import {withRouter} from 'react-router'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {getCategoriesMovies} from "../../redux/actions/movies-action";

import MovieCard from "../movie-card/MovieCard";
import {DarkThemeContext} from "../../context/DarkThemeContext";
import {faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './HomePage.scss'

function HomePage(props) {

    const value = useContext(DarkThemeContext)
    const {isDarkTheme} = value;

    const {getCategoriesMovies, allPages, allMovies, match: {params: {category, page}}} = props;

    useEffect(() => {
        loadingMovies()
    }, [category, page])

    useEffect(() => {
        loadingMovies()
    }, [])

    const loadingMovies = () => {
        getCategoriesMovies && getCategoriesMovies(category, page);
    };

    return (
        <div className={`may-home-page ${isDarkTheme && "may-home-page-dark"}`}>
            <div className='may-home-page-movies'>
                {
                    !!allMovies && allMovies.map(movie => {
                        return <MovieCard key={movie.id} movie={movie}/>
                    })
                }
            </div>
            <div className='may-home-page-pagination'>
                {allPages>0 && <div className='may-home-page-pagination-navigation'>
                    {
                        page > 1 &&
                        <NavLink className={`link ${isDarkTheme && "link-dark"}`}
                                 to={`/movies-category=${category}/${parseInt(page) - 1}`}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </NavLink>
                    }
                    {
                        page > 1 &&
                        <NavLink className={`link ${isDarkTheme && "link-dark"}`}
                                 to={`/movies-category=${category}/1`}>To
                            first page
                        </NavLink>
                    }

                    {
                        page < allPages &&
                        <NavLink className={`link ${isDarkTheme && "link-dark"}`}
                                 to={`/movies-category=${category}/${parseInt(page) + 1}`}>
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </NavLink>
                    }

                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = (store) => {
    const {moviesReducer: {myMovies:{results, total_pages}}} = store;
    return {
        allMovies: results,
        allPages: total_pages
    }
};

const mapDispatchToProps = ({
    getCategoriesMovies
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
