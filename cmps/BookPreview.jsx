import {utilService} from '../services/util.service.js'

export function BookPreview({book}) {
  const currencySymbol = utilService.getCurrencySymbol(book.listPrice.currencyCode)
  // const imgFileName = `${imgNum}.jpg`
  // console.log('imgFileName', imgFileName)
  // console.log('Image Path:', `../assets/img/${imgFileName}`)

  function getDefaultUrl(ev) {
    ev.target.src = 'https://via.placeholder.com/150'
  }
  return (
    <article className="book-preview">
      <img
        src={book.thumbnail}
        alt={`${book.title} thumbnail`}
        className="book-thumbnail img"
        onError={getDefaultUrl}
      />
      <h2>{book.title}</h2>
      <p>
        {currencySymbol}
        {book.listPrice.amount}
        {book.listPrice.isOnSale && <span className="sale"> On Sale</span>}
      </p>
    </article>
  )
}
