import axios from 'axios';
import { GET_RANDOM_MOVIES, START_LOADING, END_LOADING, ERROR_LOADING, apiKey } from '../Constants/constants';
import { query } from '../Helpers/RandomWorlds';

export const getActionData = (data) => {
    return {
        type: GET_RANDOM_MOVIES,
        data: data
    }
};

export const getRandomMovies = (query) => {

    return (dispatch) => {

        dispatch(START_LOADING)

        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then(response => {
            dispatch(getActionData(response.data.results));
            dispatch(END_LOADING);
        })
        .catch(error => {
            throw(error);
          })
    }
}
