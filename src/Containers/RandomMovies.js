import CircularIndeterminate from '../Components/CircularProgress'
import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../Components/MovieCard'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { apiKey } from '../Constants/constants';
import { query } from '../Helpers/RandomWorlds';


//getting random movies for start page| before user put something in searchbar
export const RandomMovies =  () => {

    const[loaded, setLoaded] = useState(false);
    const [movies, setMovies] = useState([]);

    async function getRandomMovies (){
        try {
            let apiData = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
            let results = movies.concat(apiData.data.results);
            setMovies(results)
            setLoaded(true)
            console.log(movies)
        }catch (error) {
            setLoaded(false)
            alert(error) 
        }
    };

    useEffect(() => {
        getRandomMovies()
    }, []);

    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1,
        margin: "3rem 1.5rem"
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }));

    const classes = useStyles();
   
    return (
        <div className={classes.root}>
            <InfiniteScroll
                dataLength={movies.length}
                next={getRandomMovies}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>}
            >
                <Grid container spacing={3}>
                    {!loaded && <CircularIndeterminate />}
       
                    {loaded && movies.length !== 0 ? movies.map(el => {
                        return (
                          <Grid key={el.id} item xs>
                            <Link to={`/movieinfo/${el.id}`} style={{ textDecoration: 'none' }}>
                              <MovieCard data={el} />
                            </Link>
                          </Grid>)}) : <p>Loading</p>}
                </Grid>
             </InfiniteScroll>    
        </div>
    )
};