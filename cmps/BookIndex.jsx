import {bookService} from '../services/book.service.js'
import {BookDetails} from './BookDetails.jsx'
import {BookFilter} from './BookFilter.jsx'
import {BookList} from './BookList.jsx'
import {BookEdit} from './BookEdit.jsx'

const {useEffect, useState} = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getFilterBy() || {})
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => {
        setBooks(books)
      })
      .catch((err) => {
        console.log(`Problem getting books.. ${err}`)
      })
  }

  function onSelectedBookId(bookId) {
    setSelectedBookId(bookId)
  }

  function onSetFilterBy(filterBy) {
    setFilterBy({...filterBy})
  }

  function onSaveBook(bookTOSave) {
    bookService
      .save(bookTOSave)
      .then(() => {
        setIsEdit(false)
        setSelectedBookId(null)
        loadBooks()
      })
      .catch((err) => {
        console.error(`Had issue with book save ${err}`)
      })
  }

  function onRemoveBook(bookId) {
    const isConfirmed = confirm(`YOu sure?`)
    if (!isConfirmed) return

    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prev) => prev.filter((book) => book.id !== bookId))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  if (!books) return <h1>Loading....</h1>

  return (
    <section className="book-index">
      {selectedBookId ? 
        isEdit ? 
          <BookEdit bookId={selectedBookId} onSaveBook={onSaveBook} onCancel={() => setIsEdit(false)} />
        : 
          <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} onEdit={() => setIsEdit(true)} />
       
       : 
        <React.Fragment>
          <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
          <BookList books={books} onSelectedBookId={onSelectedBookId} onRemoveBook={onRemoveBook}/>
        </React.Fragment>
      }{' '}
    </section>
  )
}
