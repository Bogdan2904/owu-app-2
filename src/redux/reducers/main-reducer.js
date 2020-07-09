import {combineReducers} from "redux";
import {genresReducer} from "./genres-reducers";
import {moviesReducer} from "./movies-reducers";
import {singleMovieReducer} from "./single-movie-reducer";

export const createRootReducer = () => {
    return combineReducers({
        genresReducer,
        moviesReducer,
        singleMovieReducer
    });
};
