import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import {Provider} from "react-redux";
import {appStore} from "../../redux/store";
import Header from "../header/Header";
import HomePage2 from "../home-page/HomePage";
import SearchPage from "../search-page/SearchPage";
import MoviePage from "../movie-page/MoviePage";
import MovieDetails from "../details-movies/MovieDetails";
import {isDarkTheme} from "../../context/DarkThemeContext";
import {DarkThemeContext} from "../../context/DarkThemeContext";
import DarkThemeContextWrapper from "../darkThemeContextWrapper/DarkThemeContextWrapper";

class App extends Component {


    render() {
        return (
            <DarkThemeContextWrapper>
                <Provider store={appStore}>
                    <Router>
                        <Header/>
                        <Switch>


                            <Route path="/movies-category=:category/:page"
                                   render={(routerProps) => {
                                       return (<HomePage2 routerProps={routerProps}/>);
                                   }} exact/>

                            <Route path="/movies-search=:search">
                                <SearchPage/>
                            </Route>

                            <Route path='/movie-page/:movieId'>
                                <MoviePage/>
                            </Route>

                            <Redirect from="*" to="/movies-category=popular/1" exact/>

                        </Switch>
                    </Router>
                </Provider>
            </DarkThemeContextWrapper>
        );
    }

}

export default App;
