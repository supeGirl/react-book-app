const {useState, useEffect} = React

import {bookService} from '../services/book.service.js'
import { utilService } from '../services/util.service.js'

export function BookDetails({onBack, bookId }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    loadBook()
  }, [])

  function loadBook() {
    bookService.get(bookId)
      .then(book => {
        setBook(book)
      })
      .catch((err) => {
        console.log(`Problem getting book.. ${err}`)
      })
  }

  if (!book) return <h1>Loading..</h1>

  
  return (
    <section className="book-details">
      <h1>Title: {book.title}</h1>
      <h1>
        price:{utilService.getCurrencySymbol(book.listPrice.currencyCode)} {book.listPrice.amount} 
      </h1>
      {/* <img src={`../assets/img/${imgFileName}`} alt={`${title} thumbnail`} className="book-thumbnail" /> */}
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt et laudantium in vitae provident quas dignissimos nostrum deserunt, mollitia assumenda! Omnis asperiores aut sit quibusdam id. Nisi quo ut nobis doloribus ipsa, incidunt adipisci repellendus porro sit architecto alias vel eveniet magni debitis laudantium at quia quidem accusamus officiis libero qui praesentium facilis corrupti dicta. Distinctio maxime dolorum perferendis, sint dolore accusantium inventore harum nobis libero facilis explicabo consequuntur minima aliquid necessitatibus quam iure ratione fugiat magnam? Eveniet adipisci praesentium sunt labore, ducimus corporis doloribus asperiores repellat accusamus provident earum consectetur quod, vero dolorem quisquam omnis quis quam saepe laudantium.</p>
        <button onClick={onBack}>Back</button>
    </section>
  )
}
