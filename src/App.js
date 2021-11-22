import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Library from './components/Library'
import Search from './components/Search'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    books: [],
    loading: true,
  }
  
  componentDidMount() {
    this.getBooks()
  }

  update = async (book, shelf) => {

    this.setState({ loading: true })
    await BooksAPI.update(book, shelf)
    const myBooks = this.state.books.find(B => B.id === book.id)
    if (myBooks) {
      this.setState({
        loading: false,
        books: this.state.books.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf
          }
          // console.log(b)

          return b

        })
      })


    } else {
      this.setState({
        loading: false,
        books: [...this.state.books, { ...book, shelf }]
      })
    }
  }
  render() {
    // console.log(this.state.books)
    return (
      <>
        <Route path='/' exact render={() => (
          <Library books={this.state.books} update={this.update}

          />)}>

        </Route>
        <Route path='/search' render={() => (<Search books={this.state.books} update={this.update} />)}></Route>
      </>

    )
  }
  // Get Books from DB
  async getBooks() {
    const books = await BooksAPI.getAll()
    this.setState({
      books,
      loading: false
    })
  }
}

export default BooksApp
