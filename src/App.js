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
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books,
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
        if(book.shelf === 'none' && shelf !== 'none') {
          book.shelf = shelf;
          this.state.books.push(book)
        } else {
          book.shelf = shelf;
        }
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
            currentlyReadingBooks={this.state.currentlyReadingBooks.map((book) => (
              book.id
            ))}
            wantToReadBooks={this.state.wantToReadBooks.map((book) => (
              book.id
            ))}
            readBooks={this.state.readBooks.map((book) => (
              book.id
            ))}
            onUpdateBook={(book, shelf) => {
              this.updateBook(book, shelf)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
