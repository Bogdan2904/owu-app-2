import {SINGLE_MOVIE_LOAD} from "../action-type";

const defaultValue ={
    mySingleMovie:{}
};

export const singleMovieReducer=(store=defaultValue, action)=> {

    switch (action.type) {
        case SINGLE_MOVIE_LOAD:{
            debugger
            return {
                mySingleMovie: action.payload
            }
        }
        default: return store;
    }

};
