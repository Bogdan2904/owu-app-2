import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSearchMovies} from "../../redux/actions/movies-action";
import MovieCard from "../movie-card/MovieCard";
import './SearchPage.scss'
import {withRouter} from 'react-router'

import {DarkThemeContext} from "../../context/DarkThemeContext";
import queryString from "query-string";


class SearchPage extends Component {


    constructor(props) {
        super(props);
        debugger

        const {location: {search}} = props;
        const page = queryString.parse(search);

        this.state = {
            page: parseInt(page.page) || 1
        };
        debugger

    }

    static contextType = DarkThemeContext;



    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.search !== this.props.match.params.search ){
            this.loadingSearchMovies();
        }

        if(prevState.page !== this.state.page){
            this.loadingSearchMovies();
        }
    }

    componentDidMount() {
        this.loadingSearchMovies();
    }

    loadingSearchMovies=()=>{
        const { page } = this.state;
        const { getSearchMovies, match:{params:{search}}  } = this.props;
        getSearchMovies && getSearchMovies(search, page);
    };

    goToTheNextPage = () => {
        this.setState({
            page: this.state.page + 1
        })
    };

    goToTheFirstPage = () => {
        this.setState({
            page: 1
        })
    };

    goBackPage = () => {
        if(this.state.page > 1)
            this.setState({
                page: this.state.page - 1
            })
    };


    render() {
        const { allMovies } = this.props;
        const { page } = this.state;
        const {isDarkTheme} = this.context;

        return (
            <div className={`may-search-page ${isDarkTheme && "dark"}`}>
                {
                    !!allMovies && allMovies.map(movie=>{
                        return <MovieCard key={movie.id} movie={movie}/>
                    })
                }

                    <div>
                        {
                            page > 1 &&
                                <button type='button' className='btn' onClick={this.goBackPage}>To passed
                                    page
                                </button>
                        }
                            <button type='button' className='btn' onClick={this.goToTheFirstPage}>To first page
                            </button>
                            <button type='button' className='btn' onClick={this.goToTheNextPage}>Next page
                            </button>
                    </div>
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
