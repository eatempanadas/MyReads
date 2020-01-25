import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'

class SearchReads extends Component {
    static propType = {
        currentlyReadingBooks: PropTypes.array.isRequired,
        wantToReadBooks: PropTypes.array.isRequired,
        readBooks: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }
    state = {
        query: '',
        queryBooks: []
    }
    updateQuery = (value) => {
        this.setState(() => ({
            query: value
        }))
        BooksAPI.search(value)
          .then((resp) => {
            let books = resp;
            if(!resp || resp.error) {
                books = []
            } else {
                for (const book of books) {
                    if (this.props.currentlyReadingBooks.includes(book.id)) {
                        book.shelf = 'currentlyReading'
                    } else if (this.props.wantToReadBooks.includes(book.id)) {
                        book.shelf = 'wantToRead'
                    } else if (this.props.readBooks.includes(book.id)) {
                        book.shelf = 'read'
                    } else {
                        book.shelf = 'none'
                    }
                }
            }
            this.setState(() => ({
              queryBooks: books
            }))
        })
    }
    render() {
        const { queryBooks, query } = this.state
        const { onUpdateBook } = this.props
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'>
                            <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {queryBooks.length > 1 ? queryBooks.map((book) => (
                            <li key={book.id} className='book-item'>
                                <div className="book">
                                    <div className="book-top">
                                        <div 
                                            className="book-cover" 
                                            style={{
                                                width: 128,
                                                height: 193,
                                                backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`
                                            }}></div>
                                        <div className="book-shelf-changer">
                                            <select
                                                value={book.shelf}
                                                onChange={(event) => onUpdateBook(book, event.target.value)}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-title">{book.authors ? book.authors.toString() : 'None'}</div>
                                </div>
                            </li>
                        )) : <p>No results.</p>}
                    </ol>
                </div>
          </div>
        )
    }


}

export default SearchReads