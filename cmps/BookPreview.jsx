export function BookPreview({book, imgNum}) {
  const {title, listPrice} = book
  const imgFileName = `${imgNum}.jpg`
  // console.log('imgFileName', imgFileName)

  return (
    <article className="book-preview">
         <img src={`../assets/img/${imgFileName}`} alt={`${title} thumbnail`} className="book-thumbnail" />
      <h2>Title: {title}</h2>
      <p>
        price: {listPrice.amount} {listPrice.currencyCode}
        {listPrice.isOnSale && <span className="sale"> On Sale</span>}
      </p>
     
    </article>
  )
}
