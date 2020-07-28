import CircularIndeterminate from '../Components/CircularProgress';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../Components/MovieCard';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { getRandomMovies } from '../Actions/index';
import { apiKey } from '../Constants/constants';
import { query } from '../Helpers/RandomWorlds';

//getting random movies for start page| before user put something in searchbar
const RandomMovies = ({ dispatch, loading, loaded, error, movies, errorMessage }) => {
  // const [loaded, setLoaded] = useState(false);
  // const [movies, setMovies] = useState([]);

  // async function getRandomMovies() {
  //   try {
  //     let apiData = await axios(
  //       `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  //     );
  //     let results = movies.concat(apiData.data.results);
  //     setMovies(results);
  //     setLoaded(true);
  //     console.log(movies);
  //   } catch (error) {
  //     setLoaded(false);
  //     alert(error);
  //   }
  // }

  // useEffect(() => {
  //   getRandomMovies();
  // }, []);

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
    console.log(movies);
  }, [dispatch]);

  return (
    <>
      {loading && <CircularIndeterminate />}
      {loaded ? (
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
              {loaded && movies.length !== 0 ? (
                movies.map((el) => {
                  return (
                    <Grid key={el.id} item xs>
                      <Link to={`/movieinfo/${el.id}`} style={{ textDecoration: 'none' }}>
                        <MovieCard data={el} />
                      </Link>
                    </Grid>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
            </Grid>
          </InfiniteScroll>
        </div>
      ) : (
        <p> loading</p>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.isLoading,
    loaded: state.loaded,
    error: state.isError,
    movies: state.movies,
    errorMessage: state.errorMessage,
  };
};

export default connect(mapStateToProps)(RandomMovies);
