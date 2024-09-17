import {bookService} from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'
import {BookList} from './BookList.jsx'

const {useEffect, useState} = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    bookService
      .query()
      .then(setBooks)
      .catch((err) => {
        console.log(`Problem getting books.. ${err}`)
      })
  }

  function onSelectedBookId(bookId) {
    setSelectedBookId(bookId)
  }

  if (!books) return <h1>Loading....</h1>
  return (
    <section className="book-index">
   {selectedBookId ? (
        <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />
      ) : (
        <React.Fragment>
          <BookList books={books} onSelectedBookId={onSelectedBookId}/>
        </React.Fragment>
      )}    </section>
  )
}
