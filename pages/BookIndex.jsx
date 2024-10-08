const {useEffect, useState} = React
const {Link, useSearchParams} = ReactRouterDOM

import {showErrorMsg, showSuccessMsg, showUserMsg} from '../services/event-bus.service.js'
import {bookService} from '../services/book.service.js'
import {BookFilter} from '../cmps/BookFilter.jsx'
import {BookList} from '../cmps/BookList.jsx'
import {AppLoader} from '../cmps/AppLoader.jsx'
import { getTruthyValues } from "../services/util.service.js"


export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [searchPrms, setSearchPrms] = useSearchParams()
  const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchPrms))

  useEffect(() => {
    loadBooks()
    setSearchPrms(getTruthyValues(filterBy))
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log(`Problem getting books.. ${err}`)
        showErrorMsg(`Problems getting books..`)
      })
  }

  function onRemoveBook(bookId) {
    const isConfirmed = confirm(`You sure?`)
    if (!isConfirmed) return

    bookService
      .remove(bookId)
      .then(() => {
        setBooks((book) => book.filter((book) => book.id !== bookId))
        showSuccessMsg(`Book removed successfully!`)
      })
      .catch((err) => {
        console.error(`Problems removing ${err.message}`)
        showErrorMsg(`Problems removing book (${bookId})`)
      })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy({...filterBy})
  }

  if (!books) return <AppLoader />

  return (
    <section className="book-index">
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <section>
        <Link to="/book/edit">Add Book</Link>
      </section>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
}
