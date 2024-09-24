import {utilService} from './util.service.js'
import {storageService} from './async-storage.service.js'
import {getDemoBooks} from './book-api-demo.js'

const BOOK_KEY = 'bookDB'
_createBooks()


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
  return storageService.query(BOOK_KEY).then((books) => {
    books = _getFilteredBooks(books, filterBy)
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
  .then(book => _setNextPrevBookId(book))
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

function getEmptyBook() {
  return {
    id: utilService.makeId(),
    authors: [],
    categories: [],
    description: '',
    language:'',
    listPrice: {
      amount:0,
      currencyCode: 'USD',
      isOnSale: false,
    },
    pageCount: 0,
    publishedDate:2024,
    subtitle:'',
    thumbnail:'',
    title:'',
  }
}

function getFilterBy() {
  return {
    title: '',
    maxPrice: 0,
  }
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
    books = getDemoBooks()
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _getFilteredBooks(books, filterBy) {
  if (filterBy.title) {
    const regExp = new RegExp(filterBy.title, 'i')
    books = books.filter((book) => regExp.test(book.title))
  }
  if (filterBy.maxPrice) {
    books = books.filter((book) => book.listPrice.amount <= filterBy.maxPrice)
  }
  if (filterBy.minPrice) {
    books = books.filter((book) => book.listPrice.amount >= filterBy.minPrice)
  }
  if (filterBy.category) {
    books = books.filter((book) => book.categories.includes(filterBy.category))
  }
  if (filterBy.isOnSale) {
    books = books.filter((book) => book.listPrice.isOnSale)
  }

  return books
}

function _setNextPrevBookId(book) {
  return query().then((books) => {
      const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
      const nextbook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
      const prevbook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
      book.nextbookId = nextbook.id
      book.prevbookId = prevbook.id
      return book
  })
}