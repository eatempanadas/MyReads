import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class ViewListedReads extends Component {
    static propType = {
        currentlyReadingBooks: PropTypes.array.isRequired,
        wantToReadBooks: PropTypes.array.isRequired,
        readBooks: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }
    render() {
        const { currentlyReadingBooks, wantToReadBooks, readBooks, onUpdateBook } = this.props
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {currentlyReadingBooks.map((book) => (
                                    <li key={book.id} className='book-item'>
                                        <div className="book">
                                            <div className="book-top">
                                                <div 
                                                    className="book-cover" 
                                                    style={{
                                                        width: 128,
                                                        height: 193,
                                                        backgroundImage: `url(${book.imageLinks.thumbnail})`
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
                                ))}
                            </ol>
                        </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {wantToReadBooks.map((book) => (
                                    <li key={book.id} className='book-item'>
                                        <div className="book">
                                            <div className="book-top">
                                                <div 
                                                    className="book-cover" 
                                                    style={{
                                                        width: 128,
                                                        height: 193,
                                                        backgroundImage: `url(${book.imageLinks.thumbnail})`
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
                                ))}
                            </ol>
                        </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {readBooks.map((book) => (
                                    <li key={book.id} className='book-item'>
                                        <div className="book">
                                            <div className="book-top">
                                                <div 
                                                    className="book-cover" 
                                                    style={{
                                                        width: 128,
                                                        height: 193,
                                                        backgroundImage: `url(${book.imageLinks.thumbnail})`
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
                                ))}
                            </ol>
                        </div>
                        </div>
                    </div>
                </div>
            <div className="open-search">
                <Link
                    to='/search'>
                        <button>Add a book</button>
                </Link>
            </div>
          </div>
        )
    }


}

export default ViewListedReads