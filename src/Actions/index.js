import axios from 'axios';
import { apiKey } from '../Constants/constants';
import { query } from '../Helpers/RandomWorlds';
import {
  FETCH_RANDOM_MOVIES,
  FETCH_MOVIE_INFO,
  START_LOADING,
  END_LOADING,
  ERROR_LOADING,
} from '../ActionTypes/index';

export const fetchRandomMovies = (movies) => {
  return {
    type: FETCH_RANDOM_MOVIES,
    payload: movies,
  };
};

export const getRandomMovies = () => async (dispatch) => {
  dispatch(loadStart());
  try {
    const response = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );
    dispatch(fetchRandomMovies(response.data.results));
    dispatch(loadEnd());
  } catch (e) {
    dispatch(ERROR_LOADING(e.message));
  }
};

export const fetchMovieInfo = (data) => {
  return {
    type: FETCH_MOVIE_INFO,
    payload: data,
  };
};

export const loadStart = () => {
  return {
    type: START_LOADING,
  };
};

export const loadEnd = () => {
  return {
    type: END_LOADING,
  };
};

export const errorLoading = (message) => {
  return {
    type: ERROR_LOADING,
    payload: message,
  };
};
