import {utilService} from './util.service.js'
import {storageService} from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = {txt: '', price: 0}
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getNextBookId,
  getFilterBy,
  setFilterBy,
}

function query(gFilterBy) {
  return storageService.query(BOOK_KEY)
  .then((books) => {
    if (gFilterBy.txt) {
      const regex = new RegExp(gFilterBy.txt, 'i')
      books = books.filter((book) => regex.test(book.title))
    }
    if (gFilterBy.price) {
        const filterPrice = +gFilterBy.price
        books = books.filter(book => +book.listPrice.amount >= filterPrice)
      console.log('Books after price filter:', books);
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(title = '', listPrice = {amount: 0, currencyCode: 'USD', isOnSale: false}) {
  return {
    id: utilService.makeId(),
    title,
    listPrice,
  }
}

function getFilterBy() {
  return {...gFilterBy}
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
  return gFilterBy
}

function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let nextBookIdx = books.findIndex((book) => book.id === bookId) + 1
    if (nextBookIdx === books.length) nextBookIdx = 0
    return books[nextBookIdx].id
  })
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = []
    books.push(_createBook('Metus Hendrerit', {amount: 109, currencyCode: 'EUR', isOnSale: false}))
    books.push(_createBook('Morbi', {amount: 44, currencyCode: 'USD', isOnSale: true}))
    books.push(_createBook('At Viverra Venenatis', {amount: 88, currencyCode: 'ILS', isOnSale: false}))
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(title, listPrice) {
  const book = getEmptyBook(title, listPrice)
  book.id = utilService.makeId()
  return book
}
