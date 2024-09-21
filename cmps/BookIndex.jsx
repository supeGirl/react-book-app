import {bookService} from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'
import { BookFilter } from './BookFilter.jsx'
import {BookList} from './BookList.jsx'

const {useEffect, useState} = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getFilterBy() || {})

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(books => {
        setBooks(books)
      })
      .catch((err) => {
        console.log(`Problem getting books.. ${err}`)
      })
  }

  function onSelectedBookId(bookId) {
    setSelectedBookId(bookId)
  }

  function onSetFilterBy(filterBy){
    setFilterBy({...filterBy})
  }

  if (!books) return <h1>Loading....</h1>
  return (
    <section className="book-index">
   {selectedBookId ? (
     <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />
    ) : (
      <React.Fragment>
          <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
          <BookList books={books} onSelectedBookId={onSelectedBookId}/>
        </React.Fragment>
      )}    </section>
  )
}
