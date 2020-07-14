import {combineReducers} from "redux";
import {moviesReducer} from "./movies-reducers";
import {singleMovieReducer} from "./single-movie-reducer";

export const createRootReducer = () => {
    return combineReducers({
        moviesReducer,
        singleMovieReducer
    });
};
