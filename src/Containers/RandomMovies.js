import CircularIndeterminate from '../Components/CircularProgress'
import React, { useEffect, useState} from 'react';
import MovieCard from '../Components/MovieCard'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';


//getting random movies for start page| before user put something in searchbar
export const RandomMovies =  () => {

    const[loaded, setLoaded] = useState(false);
    const [movies, setMovies] = useState([]);
    const key = '177ad4a5b431aa7454ee8710dc22b0dc';

    async function getRandomMovies (){
        try {
            let randomWords = require('random-words');
            let query = randomWords();
            let apiData = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`)
            let results = movies.concat(apiData.data.results)
            setMovies(results)
            setLoaded(true)
            console.log(movies)
        }catch (error) {
            setLoaded(false)
            alert(error) 
        }
    }

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
                     </p>
                   }
                >

                <Grid container spacing={3}>

                    {!loaded && <CircularIndeterminate />}

                    {loaded && movies.length !== 0 ? movies.map(el => {
                        return (
                            <Grid item xs>
                                <MovieCard data={el}/>
                            </Grid>)}) : <p>404 not found</p>}

                </Grid>
            
                </InfiniteScroll>

          
            
        </div>
    )
}

