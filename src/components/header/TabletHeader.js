import React, {useState, useContext} from 'react';

import {DarkThemeContext} from "../../context/DarkThemeContext";
import {categoriesOfFilm} from "../../constants/constants";

import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {Button, Form} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVideo, faTimes, faBars} from '@fortawesome/free-solid-svg-icons'

import './Header.scss'

export function TabletHeader() {

    let [collapse2, setCollapse2] = useState(false)
    let [searchValue, setSearchValue] = useState('')

    const value = useContext(DarkThemeContext);

    const openNav = () => {
        setCollapse2(collapse2 = !collapse2)
        document.getElementById("mySidenav").style.width = "330px";
    }

    const closeNav = () => {
        setCollapse2(collapse2 = !collapse2)
        document.getElementById("mySidenav").style.width = "0";
    }

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

    const {isDarkTheme, toggleTheme} = value;
    return (

        <div className={`may-tablet-header ${isDarkTheme && 'may-tablet-header-dark'}`}>
            <div className='may-tablet-header-burger' onClick={openNav}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
            <Form className='may-tablet-header-form'>
                <input value={searchValue}
                       onKeyPress={clickEnterOnSearchInput}
                       onChange={searchOnChange} type="text"
                       placeholder={"Search"} className="mr-sm-2 input"/>
                <Link to={`/movies-search=${searchValue}/1`}>
                    <Button variant="outline-success"
                            onClick={cleanSearchValue}>Search</Button>
                </Link>
            </Form>
            <div>
                <BootstrapSwitchButton
                    checked={isDarkTheme}
                    onlabel='ON'
                    offlabel='OF'
                    onstyle="secondary"
                    onChange={toggleTheme}
                />
            </div>

            <div id="mySidenav"
                 className={`may-tablet-header-sidenav ${isDarkTheme && 'may-tablet-header-sidenav-dark'}`}>

                <div
                    className={`may-tablet-header-sidenav-closebtn ${isDarkTheme && 'may-tablet-header-sidenav-closebtn-dark'}`}
                    onClick={closeNav}>
                    <FontAwesomeIcon icon={faTimes}/>
                </div>

                <div
                    className={`may-tablet-header-sidenav-logo ${isDarkTheme && 'may-tablet-header-sidenav-logo-dark'}`}>
                    <FontAwesomeIcon icon={faVideo}/>
                </div>

                <div className='may-tablet-header-sidenav-menu'>
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

