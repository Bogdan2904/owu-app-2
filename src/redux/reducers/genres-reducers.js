import {GENRES_LOAD} from "../action-type";


const defaultValue={
    myGenres:[
        {"id":1,
            "name":"All genres"
        }]
};

export const genresReducer=(store=defaultValue, action)=> {

    switch (action.type) {
        case GENRES_LOAD:{

            const {myGenres}=store;
            const {genres} = action.payload;

            return {

                ...store,
                myGenres: [...myGenres,...genres]
            }
        }
        default: return store;
    }

};

