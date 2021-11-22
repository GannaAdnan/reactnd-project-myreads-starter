import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends Component {

    state = {
        showingBooks: []
    }
    search = async (query) => {
        if (query.trim()) {

            const searchBook = await BooksAPI.search(query)
            if (searchBook && !searchBook.error && searchBook.length) {
                const SearchMyBooks = searchBook.map(b => {
                    const bookfound = this.props.books.find(bb => bb.id === b.id)
                    if (bookfound) {
                        b.shelf = bookfound.shelf
                    }
                    return b;
                })
                this.setState({
                    showingBooks: SearchMyBooks
                })
            } else {
                this.setState({
                    showingBooks: []
                })
            }


        }
        else {
            this.setState({
                showingBooks: []
            })
        }

    }

    render() {
        const { showingBooks } = this.state
        // console.log(showingBooks)
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" onChange={(e) => this.search(e.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map(book => <Book key={book.id} book={book} update={this.props.update} />)}
                    </ol>
                </div>
            </div>
        );
    }

}

export default Search