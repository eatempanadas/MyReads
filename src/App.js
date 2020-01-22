import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import ViewListedReads from './ViewListedReads.js'
import SearchReads from './SearchReads.js'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
          currentlyReadingBooks: books.filter((b) => (
            b.shelf === 'currentlyReading'
          )),
          wantToReadBooks: books.filter((b) => (
            b.shelf === 'wantToRead'
          )),
          readBooks: books.filter((b) => (
            b.shelf === 'read'
          ))
        }))
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ViewListedReads
            currentlyReadingBooks={this.state.currentlyReadingBooks}
            wantToReadBooks={this.state.wantToReadBooks}
            readBooks={this.state.readBooks}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchReads
            books={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
