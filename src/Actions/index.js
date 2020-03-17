import axios from 'axios';

const key = '177ad4a5b431aa7454ee8710dc22b0dc';
let randomWords = require('random-words');
let query = randomWords();

export const getActionData = (data) => {
    return {
        type: 'GET_RANDOM_MOVIES',
        data: data
    }
};

export const getRandomMovies = (query) => {

    return (dispatch) => {

        dispatch('LOAD_START')

        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`)
        .then(response => {
            dispatch(getActionData(response.data.results));
            dispatch('LOAD_END');
        })
        .catch(error => {
            throw(error);
          })
    }
}
