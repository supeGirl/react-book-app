const {useState, useEffect} = React

import {bookService} from '../services/book.service.js'

export function BookDetails({onBack, bookId }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    loadBook()
  }, [])

  function loadBook() {
    bookService.get(bookId)
      .then(setBook)
      .catch((err) => {
        console.log(`Problem getting book.. ${err}`)
      })
  }

  if (!book) return <h1>Loading..</h1>

  const {title, listPrice} = book
//   const imgFileName = `${imgNum}.jpg`
  

  return (
    <section className="book-details">
      <h1>Title: {title}</h1>
      <h1>
        price: {listPrice.amount} {listPrice.currencyCode}
      </h1>
      {/* <img src={`../assets/img/${imgFileName}`} alt={`${title} thumbnail`} className="book-thumbnail" /> */}
        <button onClick={onBack}>Back</button>
    </section>
  )
}
