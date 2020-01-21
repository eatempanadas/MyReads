import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import ViewListedReads from './ViewListedReads.js'
import SearchReads from './SearchReads.js'
import './App.css'

class BooksApp extends Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ViewListedReads
          />
        )} />
        <Route path='/search' render={() => (
          <SearchReads
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
