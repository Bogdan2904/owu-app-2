import {API_Key} from "../../constants/constants";
import {MOVIES_LOAD} from "../action-type";
import {SINGLE_MOVIE_LOAD} from "../action-type";


export const getSearchMovies = (query, currentPage) => {
    return (dispatch) => {
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${query}&page=${currentPage}`)

            .then(response => response.json())

            .then((data) => {
                dispatch({
                    type: MOVIES_LOAD,
                    payload: data
                })
            })
            .catch(error => console.log('Error', error))
    }
};

export const getCategoriesMovies = (type, currentPage) => {
    return (dispatch) => {
        return fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${API_Key}&language=en-US&page=${currentPage}`)

            .then(response => response.json())

            .then((data) => {
                dispatch({
                    type: MOVIES_LOAD,
                    payload: data
                })
            })
            .catch(error => console.log('Error', error))
    }
};

export const getSingleMovie = (movieId) => {
    return (dispatch) => {
        return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=8af4a5dfed06f128218e744e203cfed1`)

            .then(response => response.json())

            .then((data) => {
                dispatch({
                    type: SINGLE_MOVIE_LOAD,
                    payload: data
                })
            })
            .catch(error => console.log('Error', error))
    }
};

export const getSimilarMovies = (movieId) => {
    return (dispatch) => {
        return fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_Key}&language=en-US&page=1`)

            .then(response => response.json())

            .then((data) => {
                debugger
                dispatch({
                    type: MOVIES_LOAD,
                    payload: data
                })
            })
            .catch(error => console.log('Error', error))
    }
};

