import React, {Component} from 'react';
import {connect} from "react-redux";
import MovieCard from "../movie-card/MovieCard";
import {getCategoriesMovies} from "../../redux/actions/movies-action";
import {DarkThemeContext} from "../../context/DarkThemeContext";
import {withRouter} from 'react-router'
import {NavLink} from "react-router-dom";


import './HomePage.scss'

class HomePage extends Component {


    static contextType = DarkThemeContext;


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.routerProps.match.params.category !== this.props.routerProps.match.params.category) {
            this.loadingMovies();
        }


        if (prevProps.routerProps.match.params.page !== this.props.routerProps.match.params.page) {
            this.loadingMovies();
        }

    }

    componentDidMount() {
        this.loadingMovies();
    }

    loadingMovies = () => {
        const {getCategoriesMovies, routerProps: {match: {params: {category, page}}}} = this.props;
        getCategoriesMovies && getCategoriesMovies(category, page);
    };


    render() {
        const {allMovies, routerProps: {match: {params: {category, page}}}} = this.props;

        const {isDarkTheme} = this.context;

        return (
            <div className={`may-home ${isDarkTheme && "dark"}`}>
                <div className={`may-home-page `}>
                    {
                        !!allMovies && allMovies.map(movie => {
                            return <MovieCard key={movie.id} movie={movie}/>
                        })
                    }
                    {!!allMovies && <div className='may-home-page-navigation'>
                        {
                            page > 1 &&
                            <NavLink className={`link ${isDarkTheme && "link-dark"}`} to={`/movies-category=${category}/${parseInt(page) - 1}`}>To passed
                                page
                            </NavLink>
                        }
                        <NavLink className={`link ${isDarkTheme && "link-dark"}`} to={`/movies-category=${category}/1`}>To first page
                        </NavLink>

                        <NavLink className={`link ${isDarkTheme && "link-dark"}`} to={`/movies-category=${category}/${parseInt(page) + 1}`}>Next page
                        </NavLink>
                    </div>}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (store) => {
    const {genresReducer: {myGenres}, moviesReducer: {myMovies}} = store;
    console.log('myMovies', myMovies);
    return {
        allMovies: myMovies.results,
        allGenres: myGenres

    }
};

const mapDispatchToProps = ({
    getCategoriesMovies
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
