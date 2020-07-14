import React, {useContext, useState} from 'react';
import {Link, NavLink} from "react-router-dom";

import {categoriesOfFilm} from "../../constants/constants";
import {DarkThemeContext} from "../../context/DarkThemeContext";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes, faVideo} from "@fortawesome/free-solid-svg-icons";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {Button, Form} from "react-bootstrap";
import './Header.scss'

export function MobileHeader() {

    let [collapse3, setCollapse3] = useState(false)
    let [searchValue, setSearchValue] = useState('')

    const value = useContext(DarkThemeContext);

    const searchOnChange = (event) => {
        const value = event.target.value;
        setSearchValue(searchValue = value)
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

    const openNav = () => {
        setCollapse3(collapse3 = !collapse3);
        document.getElementById("mySidenav").style.width = "250px";
    }

    const closeNav = () => {
        setCollapse3(collapse3 = !collapse3);
        document.getElementById("mySidenav").style.width = "0";
    }

    const {isDarkTheme, toggleTheme} = value;

    return (
        <div className={`may-mobile-header ${isDarkTheme && 'may-mobile-header-dark'}`}>
            <div className='may-mobile-header-burger' onClick={openNav}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
            <div>
                <BootstrapSwitchButton
                    checked={isDarkTheme}
                    onlabel='ON'
                    offlabel='OF'
                    onstyle="secondary"
                    onChange={toggleTheme}
                    className='may-mobile-header-theme'
                />
            </div>

            <div id="mySidenav"
                 className={`may-mobile-header-sidenav ${isDarkTheme && 'may-mobile-header-sidenav-dark'}`}>

                <div
                    className={`may-mobile-header-sidenav-closebtn ${isDarkTheme && 'may-mobile-header-sidenav-closebtn-dark'}`}
                    onClick={closeNav}>
                    <FontAwesomeIcon icon={faTimes}/>
                </div>

                <div
                    className={`may-mobile-header-sidenav-logo ${isDarkTheme && 'may-mobile-header-sidenav-logo-dark'}`}>
                    <FontAwesomeIcon icon={faVideo}/>
                </div>

                <Form className='may-mobile-header-form'>
                    <input value={searchValue}
                           onKeyPress={clickEnterOnSearchInput}
                           onChange={searchOnChange} type="text"
                           placeholder={"Search"} className="mr-sm-2 input"/>
                    <Link to={`/movies-search=${searchValue}/1`}>
                        <Button variant="outline-success"
                                onClick={cleanSearchValue}>Search</Button>
                    </Link>
                </Form>

                <div className='may-mobile-header-sidenav-menu'>
                    {
                        categoriesOfFilm.map(categories => {
                            return (
                                <span key={categories.name}>
                                        <NavLink
                                            to={`/movies-category=${categories.url}/1`}
                                            className={`link ${isDarkTheme && 'link-dark'}`}>{categories.name}
                                        </NavLink>
                                    </span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

