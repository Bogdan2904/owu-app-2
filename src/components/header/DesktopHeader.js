import React, {useState} from "react";

import {
    Button,
    Form,
} from "react-bootstrap";
import {Link, NavLink} from 'react-router-dom'
import {MDBHamburgerToggler} from 'mdbreact';
import {categoriesOfFilm} from '../../constants/constants'

import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {DarkThemeContext} from "../../context/DarkThemeContext";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVideo} from '@fortawesome/free-solid-svg-icons'


import './Header.scss'
import * as bs from 'bootstrap/dist/css/bootstrap.css';


function DesktopHeader(props) {
    let [collapse1, setCollapse1] = useState(false)
    let [searchValue, setSearchValue] = useState('');

    const toggleSingleCollapse = () => {
        setCollapse1(collapse1 = !collapse1)
    };

    const searchOnChange = (event) => {
        const value = event.target.value;
        setSearchValue(searchValue = value);
    };

    const cleanSearchValue = (event) => {
        setSearchValue(searchValue = '')
    };

    const clickEnterOnSearchInput = (event) => {
        if (event.charCode === 13) {
            event.preventDefault();
        } else {
            return false
        }
    };

    return (
        <DarkThemeContext.Consumer>
            {
                (value) => {

                    const {isDarkTheme, toggleTheme} = value;
                    return (
                        <div className={`may-desktop-header`}>

                            <div
                                className={`may-desktop-header-close ${isDarkTheme && "may-desktop-header-close-dark-theme"}`}>

                                <div
                                    className={`may-desktop-header-close-logo  ${!isDarkTheme && "may-desktop-header-close-logo-white"}`}>
                                    <FontAwesomeIcon icon={faVideo}/>
                                </div>


                                <div className='may-desktop-header-close-center-menu '>
                                    <div className='may-desktop-header-close-center-menu-burger '>
                                        <MDBHamburgerToggler color="#d3531a" id="hamburger1"
                                                             onClick={() => toggleSingleCollapse()}/>
                                    </div>

                                    <Form className="may-desktop-header-close-center-menu-form">
                                        <input value={searchValue}
                                               onKeyPress={clickEnterOnSearchInput}
                                               onChange={searchOnChange} type="text"
                                               placeholder={"Search"} className="mr-sm-2 input"/>
                                        <Link to={`/movies-search=${searchValue}/1`}>
                                            <Button variant="outline-success"
                                                    onClick={cleanSearchValue}>Search</Button>
                                        </Link>
                                    </Form>

                                    <div className="may-desktop-header-close-center-menu-toggle-theme">
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
                                    className={`may-desktop-header-close-user ${isDarkTheme && "may-desktop-header-close-user-dark-theme"}`}>
                                    Welcome John
                                </div>

                            </div>


                            {
                                collapse1 &&
                                <div
                                    className={`may-desktop-header-open ${isDarkTheme && "may-desktop-header-open-dark-theme"}`}>
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



export default DesktopHeader;
