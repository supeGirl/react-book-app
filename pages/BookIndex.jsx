const {useEffect, useState} = React
const { Link } = ReactRouterDOM

import {bookService} from '../services/book.service.js'
import {BookFilter} from '../cmps/BookFilter.jsx'
import {BookList} from '../cmps/BookList.jsx'
import {BookEdit} from './BookEdit.jsx'
// import {BookDetails} from './BookDetails.jsx'


export function BookIndex() {
  const [books, setBooks] = useState(null)
  // const [selectedBookId, setSelectedBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getFilterBy() || {})

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log(`Problem getting books.. ${err}`)
      })
  }

  function onRemoveBook(bookId) {
    const isConfirmed = confirm(`You sure?`)
    if (!isConfirmed) return

    bookService.remove(bookId)
      .then(() => {
        setBooks((book) => book.filter(book => book.id !== bookId))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy({...filterBy})
  }

    // function onSelectedBookId(bookId) {
  //   setSelectedBookId(bookId)
  // }

  // function onSaveBook(bookTOSave) {
  //   bookService
  //     .save(bookTOSave)
  //     .then(() => {
  //       setIsEdit(false)
  //       setSelectedBookId(null)
  //       loadBooks()
  //     })
  //     .catch((err) => {
  //       console.error(`Had issue with book save ${err}`)
  //     })
  // }

  if (!books) return <h1>Loading....</h1>

  return (
    <section className="book-index">

      <BookFilter filterBy={{filterBy}} onSetFilterBy={onSetFilterBy} />
      <section>
        {/* <Link to="/book/edit" >Add Book</Link> */}
        <Link to='/book/edit'>
        Add Book
        </Link>
      </section>
      <BookList books={books}  onRemoveBook={onRemoveBook}/>
      {/* {selectedBookId ? 
        isEdit ? 
          <BookEdit bookId={selectedBookId} onSaveBook={onSaveBook} onCancel={() => setIsEdit(false)} />
        : 
          <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} onEdit={() => setIsEdit(true)} />
       
       : 
        <React.Fragment>
          <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
          <BookList books={books} onSelectedBookId={onSelectedBookId} onRemoveBook={onRemoveBook}/>
        </React.Fragment>
      }{' '} */}
    </section>
  )
}
