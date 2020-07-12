import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSearchMovies} from "../../redux/actions/movies-action";
import MovieCard from "../movie-card/MovieCard";
import './SearchPage.scss'
import {withRouter} from 'react-router'

import {DarkThemeContext} from "../../context/DarkThemeContext";
import queryString from "query-string";
import {NavLink} from "react-router-dom";


class SearchPage extends Component {


    constructor(props) {
        super(props);
        debugger


        debugger

    }

    static contextType = DarkThemeContext;



    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.search !== this.props.match.params.search ){
            this.loadingSearchMovies();
        }

        if (prevProps.match.params.page !== this.props.match.params.page) {
            this.loadingSearchMovies();
        }
    }

    componentDidMount() {
        this.loadingSearchMovies();
    }

    loadingSearchMovies=()=>{
        const { getSearchMovies, match:{params:{search, page}}  } = this.props;
        getSearchMovies && getSearchMovies(search, page);
    };

    render() {
        const { allMovies } = this.props;
        const {isDarkTheme} = this.context;
        const {match:{params:{search, page}}} = this.props;
        return (
            <div className={`may-search-page ${isDarkTheme && "dark"}`}>
                {
                    !!allMovies && allMovies.map(movie=>{
                        return <MovieCard key={movie.id} movie={movie}/>
                    })
                }

                {!!allMovies && <div className='may-home-page-navigation'>
                    {
                        page > 1 &&
                        <NavLink className={`link ${isDarkTheme && "link-dark"}`} to={`/movies-search=${search}/${parseInt(page) - 1}`}>To passed
                            page
                        </NavLink>
                    }
                    <NavLink className={`link ${isDarkTheme && "link-dark"}`} to={`/movies-search=${search}/1`}>To first page
                    </NavLink>

                    <NavLink className={`link ${isDarkTheme && "link-dark"}`} to={`/movies-search=${search}/${parseInt(page) + 1}`}>Next page
                    </NavLink>
                </div>}
            </div>

        );
    }
}


const mapStateToProps = (store) => {
    const {genresReducer: {myGenres}, moviesReducer: {myMovies}} = store;
    console.log('myMovies', myMovies);
    return {
        allGenres: myGenres,
        allMovies: myMovies.results
    }
};

const mapDispatchToProps = ({
    getSearchMovies
});
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SearchPage));
