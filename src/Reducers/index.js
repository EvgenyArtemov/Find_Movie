import { combineReducers } from 'redux';
import randomMoviesReducer from './randomMoviesReducer';
import moviesListReducer from './moviesListReducer';
import favouritesReducer from './favouritesReducer';

export const allReducers = combineReducers({
    randomMoviesReducer,
    moviesListReducer,
    favouritesReducer
})