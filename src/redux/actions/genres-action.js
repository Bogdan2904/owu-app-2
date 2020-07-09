import {API_Key} from "../../constants/constants";
import { GENRES_LOAD} from "../action-type";

export const getGenres = ()=>{
    return(dispatch)=>{
        return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_Key}&language=en-US`)

            .then(response =>response.json() )

            .then((data)=>{

                dispatch({
                    type: GENRES_LOAD,
                    payload: data
                })
            })
            .catch( error => console.log('Error', error))
    }
};
