import React, {useEffect, useContext} from 'react';
import {withRouter} from 'react-router'
import {connect} from "react-redux";
import {getSearchMovies} from "../../redux/actions/movies-action";
import {NavLink} from "react-router-dom";

import {DarkThemeContext} from "../../context/DarkThemeContext";
import MovieCard from "../movie-card/MovieCard";

import {faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './SearchPage.scss'

function SearchPage(props) {
    const {allMovies, allPages, getSearchMovies, match: {params: {search, page}}} = props;

    const value = useContext(DarkThemeContext);
    const {isDarkTheme} = value;

    useEffect(() => {
        loadingSearchMovies();
    }, [search, page])

    const loadingSearchMovies = () => {
        getSearchMovies && getSearchMovies(search, page);
    };

    useEffect(() => {
        loadingSearchMovies();
    }, [])

    return (
        <div className={`may-search-page ${isDarkTheme && "may-search-page-dark"}`}>
            <div className='may-search-page-movies'>
                {
                    !!allMovies && allMovies.map(movie => {
                        return <MovieCard key={movie.id} movie={movie}/>
                    })
                }
            </div>
            <div className='may-search-page-pagination'>
                {allPages > 0 && <div className='may-search-page-pagination-navigation'>
                    {
                        page > 1 &&
                        <NavLink className={`link ${isDarkTheme && "link-dark"}`}
                                 to={`/movies-search=${search}/${parseInt(page) - 1}`}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </NavLink>
                    }
                    {
                        page > 1 &&
                        <NavLink className={`link ${isDarkTheme && "link-dark"}`} to={`/movies-search=${search}/1`}>To
                            first
                            page
                        </NavLink>

                    }
                    {
                        page < allPages &&
                        <NavLink className={`link ${isDarkTheme && "link-dark"}`}
                                 to={`/movies-search=${search}/${parseInt(page) + 1}`}>
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </NavLink>
                    }
                </div>
                }
            </div>
        </div>
    );
}

const mapStateToProps = (store) => {
    const {moviesReducer: {myMovies: {results, total_pages}}} = store;
    return {
        allMovies: results,
        allPages: total_pages
    }
};

const mapDispatchToProps = ({
    getSearchMovies
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPage));
