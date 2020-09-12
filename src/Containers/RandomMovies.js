import CircularIndeterminate from '../Components/CircularProgress';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../Components/MovieCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getRandomMovies } from '../Actions/index';
import { apiKey } from '../Constants/constants';
import { query } from '../Helpers/RandomWorlds';

//getting random movies for start page| before user put something in searchbar
const RandomMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.randomMoviesReducer.movies, shallowEqual);
  const loaded = useSelector((state) => state.randomMoviesReducer.loaded, shallowEqual);
  const isLoading = useSelector((state) => state.randomMoviesReducer.isLoading, shallowEqual);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: '3rem 1.5rem',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    dispatch(getRandomMovies());
  }, [dispatch]);

  return (
    <>
      {/* {isLoading && <CircularIndeterminate />} */}
      {loaded && (
        <div className={classes.root}>
          <InfiniteScroll
            dataLength={movies.length}
            next={dispatch(getRandomMovies())}
            hasMore={true}
            loader={CircularIndeterminate}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Grid container spacing={3}>
              {movies.map((el) => {
                return (
                  <Grid key={el.id} item xs>
                    <Link to={`/movieinfo/${el.id}`} style={{ textDecoration: 'none' }}>
                      <MovieCard data={el} />
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default RandomMovies;
