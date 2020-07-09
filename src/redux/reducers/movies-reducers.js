import {MOVIES_LOAD} from "../action-type";


const defaultValue={
    myMovies:[]
};

export const moviesReducer=(store=defaultValue, action)=> {

    switch (action.type) {
        case MOVIES_LOAD:{

            const {myMovies}=store;

            return {

                ...store,
                myMovies: action.payload
            }
        }
        default: return store;
    }

};
