import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'


const sections = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want To Read",
    read: "Read"

}
const Library = (props) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {
                        Object.keys(sections).map(key => (
                            <Shelf key={key} title={sections[key]} shelf={key} books={props.books.filter(book => book.shelf === key)} update={props.update} />
                        ))
                    }
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'>Add Book</Link>
            </div>
        </div>
    );
}

export default Library;