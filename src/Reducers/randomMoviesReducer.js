import {
  FETCH_RANDOM_MOVIES,
  START_LOADING,
  END_LOADING,
  ERROR_LOADING,
} from '../ActionTypes/index';

const initialState = {
  isLoading: false,
  loaded: false,
  isError: false,
  errorMessage: '',
  movies: [],
};

const randomMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RANDOM_MOVIES:
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
        loaded: true,
      };

    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case ERROR_LOADING:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default randomMoviesReducer;
