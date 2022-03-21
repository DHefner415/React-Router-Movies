import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'

import SavedList from './Movies/SavedList'
import MovieList from '../src/Movies/MovieList'
import Movie from '../src/Movies/Movie'

export default function App() {
  const [saved, setSaved] = useState([]) // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5001/api/movies') // Study this endpoint with Postman
        .then(res => {
          // Study this response with a breakpoint or log statements
          console.log(res.data)
          // and set the response data as the 'movieList' slice of state
          setMovieList(res.data)
        })
        .catch(err => {
          console.error('Server Error', err)
        })
    }
    getMovies()
  }, [])

  const addToSavedList = id => {
    console.log(id)
    setSaved(id)
    // This is stretch. Prevent the same movie from being "saved" more than once
  }

  return (
    <div>
      <SavedList list={saved} addToSavedList={addToSavedList} />
      <div>
        <Switch>
          <Route path='/movies/:id'>
            <Movie movies={movieList} />
          </Route>

          <Route exact path='/'>
            <MovieList movies={movieList} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
