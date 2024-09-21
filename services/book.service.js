import {utilService} from './util.service.js'
import {storageService} from './async-storage.service.js'
import {getDemoBooks} from './book-api-demo.js'

const BOOK_KEY = 'bookDB'
_createBooks()
var gFilterBy = {
  title: '',
  maxPrice: 0,
  minPrice: 0,
  category: '',
  isOnSale: false
}

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getNextBookId,
  getFilterBy,
}


function query(filterBy = {}) {
  return storageService.query(BOOK_KEY)
      .then(books => {
          books = _getFilteredBooks(books, filterBy)
          return books
      })
}

// function query(gFilterBy) {
//   return storageService.query(BOOK_KEY).then((books) => {
//     if (gFilterBy.txt) {
//       const regex = new RegExp(gFilterBy.txt, 'i')
//       books = books.filter((book) => regex.test(book.title))
//     }
//     if (gFilterBy.price) {
//       const filterPrice = +gFilterBy.price
//       books = books.filter((book) => +book.listPrice.amount >= filterPrice)
//       console.log('Books after price filter:', books)
//     }
//     return books
//   })
// }

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
  return {
    title: '',
    maxPrice: 0,
  }
}

// function setFilterBy(filterBy = {}) {
//   if (filterBy.title !== undefined) gFilterBy.title = filterBy.title;
//   if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
//   if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
//   if (filterBy.category !== undefined) gFilterBy.category = filterBy.category
//   if (filterBy.isOnSale !== undefined) gFilterBy.isOnSale = filterBy.isOnSale
//     return gFilterBy
// }

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
    books = getDemoBooks()
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _getFilteredBooks(books, filterBy) {
  if (filterBy.title) {
    const regExp = new RegExp(filterBy.title, 'i')
    books = books.filter(book => regExp.test(book.title))
  }
  if (filterBy.maxPrice) {
    books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
  }
  if (filterBy.minPrice) {
    books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
  }
  if (filterBy.category) {
    books = books.filter(book => book.categories.includes(filterBy.category))
  }
  if (filterBy.isOnSale) {
    books = books.filter(book => book.listPrice.isOnSale)
  }

  return books
}

// function _createBook(title, listPrice) {
//   const book = getEmptyBook(title, listPrice)
//   book.id = utilService.makeId()
//   return book
// }
