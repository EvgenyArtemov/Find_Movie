import React, { useEffect, useState} from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import NoPoster from '../img/noposter.jpg'

const MovieInfo = (props) => {

    let ID = props.match.params.id

    const[loaded, setLoaded] = useState(false);
    const [movie, setMovie] = useState([]);
    const key = '177ad4a5b431aa7454ee8710dc22b0dc';
    let releaseYear = 'unspecified';

    let posterPath = NoPoster;

    let imgStyle = {
        width: '250px',
        height: 'auto',
        padding: '1rem 2rem 0 0'

    }

    if(movie.release_date){
        //cut off unneccesary information like day and month of release
        releaseYear = movie.release_date.split('').splice(0, 4).join('')
      }

    if(movie.poster_path){
        posterPath = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
    }

    async function getMovieInfo (){
        try {
            let apiData = await axios(`https://api.themoviedb.org/3/movie/${ID}?api_key=${key}&language=en-US&with_cast`)
            setMovie(apiData.data)
            console.log(apiData.data);
            setLoaded(true)
        }catch (error) {
            setLoaded(false)
            alert(error) 
        }
    }

    useEffect(() => {
        getMovieInfo()
      }, []);


    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Grid container spacing={3}>
                    
                    <Grid 
                      item xs={6} 
                      direction="row"
                      justify="flex-end" 
                      container>
                         <Grid item xs={6}>
                           <img src={posterPath || NoPoster} alt="Poster" style={imgStyle} />
                         </Grid>
                    </Grid>

                    <Grid item xs={6} container >
                    <Grid item xs={10} container direction="column" spacing={2}>
                        <Grid item xs>

                          <Typography gutterBottom variant="h4">
                            {movie.title}
                          </Typography>

                          <Divider />

                          <Typography variant="body1" color="textSecondary" gutterBottom>
                            {releaseYear}
                          </Typography>

                          <Typography variant="body2" >
                            {movie.overview}
                          </Typography>

                        </Grid>

                        <Grid item>
                          <Typography variant="body2" style={{color: "green"}} >
                            Add to favourites
                          </Typography>
                        </Grid>

                      </Grid>
                    </Grid>
                    

             
                </Grid>
            </Container>
        </>
    )
}


export default MovieInfo;