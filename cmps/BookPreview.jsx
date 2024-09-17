import {utilService} from '../services/util.service.js'

export function BookPreview({book, imgNum}) {
  const {title, listPrice} = book
  const currencySymbol = utilService.getCurrencySymbol(listPrice.currencyCode)
  const imgFileName = `${imgNum}.jpg`
  // console.log('imgFileName', imgFileName)
  // console.log('Image Path:', `../assets/img/${imgFileName}`)

  return (
    <article className="book-preview">
      <img src={`../assets/img/${imgFileName}`} alt={`${title} thumbnail`} className="book-thumbnail" />
      <h2>{title}</h2>
      <p>
        {currencySymbol}{listPrice.amount}
        {listPrice.isOnSale && <span className="sale"> On Sale</span>}
      </p>
    </article>
  )
}
