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
  saveReview,
  removeReview,
  getEmptyReview,
  getFilterFromSearchParams
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    books = _getFilteredBooks(books, filterBy)
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then((book) => _setNextPrevBookId(book))
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

function saveReview(bookId, reviewToSave) {
  return get(bookId).then((book) => {
    const review = _createReview(reviewToSave)
    book.reviews.unshift(review)
    return save(book).then(() => review)
  })
}

function removeReview(bookId, reviewId) {
  return get(bookId).then(book => {
    const newReviews = book.reviews.filter((review) => review.id !== reviewId)
    book.reviews = newReviews
    return save(book)
})
}


function getEmptyBook() {
  return {
    id: utilService.makeId(),
    title: '',
    subtitle: '',
    authors: [],
    publishedDate: 2024,
    description: '',
    pageCount: 0,
    categories: [],
    thumbnail: '',
    language: '',
    listPrice: {
      amount: 0,
      currencyCode: 'USD',
      isOnSale: false,
    },
  }
}

function getFilterFromSearchParams(searchParams) {
  const txt = searchParams.get('txt') || ''
  const maxPrice= searchParams.get('maxPrice') || ''
  const minPrice= searchParams.get('minPrice') || ''
  const category = searchParams.get('category') || ''
   const isOnSale = searchParams.get('isOnSale') === 'false'
  return {
      txt,
      maxPrice,
      minPrice,
      category,
      isOnSale
  }
}


function getFilterBy() {
  return {
    title: '',
    maxPrice: 0,
  }
}

function getEmptyReview() {
  return {
      fullName: 'new name',
      rating: 0,
      date: new Date().toISOString().slice(0, 10),
      txt: '',
      selected: 0,
  }
}


function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let nextBookIdx = books.findIndex((book) => book.id === bookId) + 1
    if (nextBookIdx === books.length) nextBookIdx = 0
    return books[nextBookIdx].id
  })
}

// ~~~~~~~~~~~~~~~~LOCAL FUNCTIONS~~~~~~~~~~~~~~~~~~~

function _createBooks() {
  const categories = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  const books = utilService.loadFromStorage(BOOK_KEY) || []

  if (books && books.length) return

  for (let i = 0; i < 20; i++) {
      const book = {
          id: utilService.makeId(),
          title: utilService.makeLorem(2),
          subtitle: utilService.makeLorem(4),
          authors: [
              utilService.makeLorem(1)
          ],
          publishedDate: utilService.getRandomIntInclusive(1950, 2024),
          description: utilService.makeLorem(20),
          pageCount: utilService.getRandomIntInclusive(20, 600),
          categories: [categories[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
          thumbnail: `/assets/booksImages/${i + 1}.jpg`,
          language: "en",
          listPrice: {
              amount: utilService.getRandomIntInclusive(80, 500),
              currencyCode: "EUR",
              isOnSale: Math.random() > 0.7
          },
          reviews: []
      }
      books.push(book)
  }
  utilService.saveToStorage(BOOK_KEY, books)
}

function _createReview(reviewToSave) {
  return {
      id: utilService.makeId(),
      ...reviewToSave,
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


