import React from 'react';
import Appbar from './Components/Appbar';
import RandomMovies from './Containers/RandomMovies';
import { Route, Switch } from 'react-router-dom';
import MovieInfo from './Containers/MovieInfo';

function App() {
  return (
    <>
      <Appbar />
      <Switch>
        <Route path="/" exact component={RandomMovies} />
        <Route path="/movieinfo/:id" component={MovieInfo} />
      </Switch>
    </>
  );
}

export default App;
