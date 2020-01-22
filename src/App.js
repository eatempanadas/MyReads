import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import ViewListedReads from './ViewListedReads.js'
import SearchReads from './SearchReads.js'
import './App.css'

class BooksApp extends Component {
  state = {
    queryBooks: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
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

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((resp) => {
        book.shelf = shelf;
        this.setState((currentState) => ({
          currentlyReadingBooks: currentState.books.filter((b) => (
            resp.currentlyReading.includes(b.id)
          )),
          wantToReadBooks: currentState.books.filter((b) => (
            resp.wantToRead.includes(b.id)
          )),
          readBooks: currentState.books.filter((b) => (
            resp.read.includes(b.id)
          ))
        }))
      })
  }

  queryBook = (query) => {
    BooksAPI.search(query)
      .then((resp) => {
        this.setState(() => ({
          queryBooks: resp
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
            onUpdateBook={(book, shelf) => {
              this.updateBook(book, shelf)
            }}
          />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchReads
            queryBooks={this.state.queryBooks}
            onUpdateBook={(book, shelf) => {
              this.updateBook(book, shelf)
              history.push('/')
            }}
            onQueryBooks={(query) => {
              this.queryBook(query)
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
