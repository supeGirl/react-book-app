import {utilService} from '../services/util.service.js'

export function BookPreview({book, imgNum}) {
  const currencySymbol = utilService.getCurrencySymbol(book.listPrice.currencyCode)
  const imgFileName = `${imgNum}.jpg`
  // console.log('imgFileName', imgFileName)
  // console.log('Image Path:', `../assets/img/${imgFileName}`)

  return (
    <article className="book-preview">
      <img src={`../assets/img/${imgFileName}`} alt={`${book.title} thumbnail`} className="book-thumbnail" />
      <h2>{book.title}</h2>
      <p>
        {currencySymbol}{book.listPrice.amount}
        {book.listPrice.isOnSale && <span className="sale"> On Sale</span>}
      </p>
    </article>
  )
}
