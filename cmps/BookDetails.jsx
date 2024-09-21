const {useState, useEffect} = React

import {bookService} from '../services/book.service.js'
import {utilService} from '../services/util.service.js'
import {LongTxt} from './LongTxt.jsx'
import {LongTxtCSS} from './LongTxtCss.jsx'

export function BookDetails({onBack, bookId, onEdit}) {
  const [book, setBook] = useState(null)
  const [features, setFeatures] = useState({
    level: '',
    vintageStatus: '',
    priceClass: '',
  })

  useEffect(() => {
    loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => {
        setBook(book)
      })
      .catch((err) => {
        console.log(`Problem getting book.. ${err}`)
      })
  }

  useEffect(() => {
    if (!book) return
    const featuresFromBook = {
      level: getReadingLevel(book.pageCount),
      vintageStatus: getVintageStatus(book.publishedDate),
      priceClass: getPriceColorClass(book.listPrice.amount),
    }

    setFeatures((prev) => ({...prev, ...featuresFromBook}))
  }, [book])

  function getReadingLevel(pageCount) {
    if (pageCount > 500) return 'Serious Reading'
    else if (pageCount > 200) return 'Decent Reading'
    else if (pageCount < 100) return 'Light Reading'
    return ''
  }

  function getVintageStatus(publishedDate) {
    const yearsOld = new Date().getFullYear() - publishedDate
    if (yearsOld > 10) return 'Vintage'
    else if (yearsOld < 1) return 'New'
    return ''
  }

  function getPriceColorClass(amount) {
    if (amount > 150) return 'red'
    if (amount < 20) return 'green'
    return ''
  }

  function getDefaultUrl(ev) {
    ev.target.src = 'https://via.placeholder.com/150'
  }

  if (!book) return <h1>Loading..</h1>

  return (
    <section className="book-details">
      <div className="book-header">
        <h2 className="book-title">{book.title}</h2>
        {book.subtitle && <h3 className="book-subtitle">{book.subtitle}</h3>}
        <img className="book-thumbnail" src={book.thumbnail} onError={getDefaultUrl} alt={`${book.title} cover`} />
      </div>

      <div className="book-info">
        <p>
          <span className="bold">Authors:</span> {book.authors.join(', ')}
        </p>
        <p>
          <span className="bold">Published:</span> {book.publishedDate} {features.vintageStatus}
        </p>
        <p>
          <span className="bold">Page Count:</span> {book.pageCount} {features.level}
        </p>
        <p>
          <span className="bold">Categories: </span>
          {book.categories.join(', ')}
        </p>

        <LongTxt txt={book.description} />
        <LongTxtCSS txt={book.description} length={50} />
      </div>

      <div className={`book-price ${getPriceColorClass(book.listPrice.amount)}`}>
        <p>
          Price: {book.listPrice.amount} {utilService.getCurrencySymbol(book.listPrice.currencyCode)}
        </p>
        {book.listPrice.isOnSale && <span className="sale"> On Sale</span>}
      </div>

      <div className="action-btns container">
        <button onClick={onBack}>Back</button>
        <button onClick={onEdit}>Edit</button>
      </div>
    </section>
  )
}
