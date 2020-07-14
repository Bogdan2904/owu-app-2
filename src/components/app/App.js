import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {Provider} from "react-redux";
import {appStore} from "../../redux/store";

import IndexHeader from "../header/IndexHeader";
import HomePage2 from "../home-page/HomePage";
import SearchPage from "../search-page/SearchPage";
import MoviePage from "../movie-page/MoviePage";

import DarkThemeContextWrapper from "../darkThemeContextWrapper/DarkThemeContextWrapper";
import DetectViewPortWrapper from "../detect-view-port-wrapper/DetectViewPortWrapper";

class App extends Component {


    render() {
        return (
                <DarkThemeContextWrapper>
                    <DetectViewPortWrapper>
                        <Provider store={appStore}>
                            <Router>
                                <IndexHeader/>
                                <Switch>

                                    <Route path="/movies-category=:category/:page">
                                        <HomePage2/>
                                    </Route>

                                    <Route path="/movies-search=:search/:page">
                                        <SearchPage/>
                                    </Route>

                                    <Route path='/movie-page/:movieId'>
                                        <MoviePage/>
                                    </Route>

                                    <Redirect from="*" to="/movies-category=popular/1" exact/>

                                </Switch>
                            </Router>
                        </Provider>
                    </DetectViewPortWrapper>
                </DarkThemeContextWrapper>
        );
    }
}

export default App;
