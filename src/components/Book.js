import React from 'react'


const Book = (props) => {

    let authors;
    try {
        authors = props.book.authors.join(' - ')

    } catch (e) {
        authors = ""
    }

    let imageURL;
    try {
        imageURL = props.book.imageLinks.thumbnail

    } catch (e) {
        try {
            imageURL = props.book.imageLinks.smallThumbnail
        } catch (e) {
            imageURL = ''
        }
    }

    // console.log(imageURL)

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageURL})` }}>{imageURL ? "" : "Book Cover"}</div>
                <div className="book-shelf-changer">
                    <select defaultValue={props.book.shelf ? props.book.shelf : "none"} onChange={(e) => props.update(props.book, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{authors}</div>
        </div>
    );
}


export default Book;