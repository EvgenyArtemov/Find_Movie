import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoPoster from '../img/noposter.jpg'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  let movie = props.data
  let posterPath = null
  let releaseYear = 'Unspecified'


  if(movie.poster_path !== null){
    posterPath = `https://image.tmdb.org/t/p/w342${movie.poster_path}`
  }

  if(movie.release_date){
    //cut off unneccesary information like day and month of release
    releaseYear = movie.release_date.split('').splice(0, 4).join('')
  }

  const Image = {
    width: "250px",
    height: "350px",
    margin: "0 auto",
    paddingTop: "10px"
  };

  //100% of container for handling different title length causing different card height
  const styleCard = {
      width: "100%",
      height: "100%"
  }

  return (
    <Card style={styleCard} className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Movie Poster"
          image={posterPath || NoPoster}
          title="Movie Poster"
          style={Image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Year: {releaseYear}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
