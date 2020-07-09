import React, {Component} from "react";

import FormControl from "react-bootstrap/FormControl";
import {
    Button,
    Form,
} from "react-bootstrap";
import {connect} from "react-redux";
import {Link, NavLink} from 'react-router-dom'
import {MDBHamburgerToggler} from 'mdbreact';
import {categoriesOfFilm} from './../../constants/constants'
import {getCategoriesMovies} from "../../redux/actions/movies-action";
import {getGenres} from "../../redux/actions/genres-action";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {DarkThemeContext} from "../../context/DarkThemeContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faVideo } from '@fortawesome/free-solid-svg-icons'



import './Header.scss'
import * as bs from 'bootstrap/dist/css/bootstrap.css';


class Header extends Component {
    state = {
        collapse1: false,
        searchValue: '',
    };


    toggleSingleCollapse = () => {
        this.setState({
            collapse1 : !this.state.collapse1
        });
    };

    searchOnChange = (event) => {
        const value = event.target.value;
        this.setState({
            searchValue: value
        })
    };

    cleanSearchValue = () => {
        this.setState({
            searchValue: ''
        })
    };


    render() {

        const {searchValue, collapse1} = this.state;
        return (
            <DarkThemeContext.Consumer>

                {
                    (value) => {

                        const {isDarkTheme, toggleTheme} = value;
                        return (
                            <div className={`may-header`}>

                                <div className={`may-header-close ${isDarkTheme && "may-header-close-dark-theme"}`}>

                                    <div className={`may-header-close-logo  ${!isDarkTheme && "may-header-close-logo-white"}`}>
                                        <FontAwesomeIcon icon={faVideo} />
                                    </div>



                                    <div className='may-header-close-center-menu '>
                                        <div className='may-header-close-center-menu-burger '>
                                            <MDBHamburgerToggler color="#d3531a" id="hamburger1"
                                                                 onClick={() => this.toggleSingleCollapse('collapse1')}/>
                                        </div>

                                        <Form  className="may-header-close-center-menu-form">
                                            <FormControl value={searchValue} onChange={this.searchOnChange} type="text"
                                                         placeholder={"Search"} className="mr-sm-2 input"/>
                                            <Link to={`/movies-search=${searchValue}`}>
                                                <Button variant="outline-success" onClick={this.cleanSearchValue}>Search</Button>
                                            </Link>
                                        </Form>

                                        <div className="may-header-close-center-menu-toggle-theme">
                                        <BootstrapSwitchButton
                                            checked={isDarkTheme}
                                            onlabel='ON'
                                            offlabel='OF'
                                            onstyle="secondary"
                                            onChange={toggleTheme}
                                        />
                                        </div>

                                    </div>



                                    <div
                                        className={`may-header-close-user ${isDarkTheme && "may-header-close-user-dark-theme"}`}>
                                        Welcome John
                                    </div>

                                </div>


                                {
                                    collapse1 &&
                                    <div className={`may-header-open ${isDarkTheme && "may-header-open-dark-theme"}`}>
                                            {
                                                categoriesOfFilm.map(categories => {
                                                    return (
                                                        <span key={categories.name}>
                                                            <NavLink
                                                                to={`/movies-category=${categories.url}/1`}
                                                                className="link">{categories.name}
                                                            </NavLink>
                                                        </span>
                                                    )

                                                })
                                            }
                                    </div>
                                }

                            </div>)
                    }}
            </DarkThemeContext.Consumer>
        )
    }
}

const mapStateToProps = (store) => {
    const {genresReducer: {myGenres}, moviesReducer: {myMovies}} = store;
    console.log('myMovies', myMovies);
    return {
        allGenres: myGenres
    }
};

const mapDispatchToProps = ({
    getCategoriesMovies,
    getGenres
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
