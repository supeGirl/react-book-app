const {useState, useEffect} = React
const {useParams, useNavigate} = ReactRouter
const {Link} = ReactRouterDOM

import {bookService} from '../services/book.service.js'
import {utilService} from '../services/util.service.js'
import {LongTxtCSS} from '../cmps/LongTxtCss.jsx'
import {AddReview} from '../cmps/AddReview.jsx'
import {AppLoader} from '../cmps/AppLoader.jsx'
import {ReviewList} from '../cmps/ReviewList.jsx'
import {showErrorMsg} from '../services/event-bus.service.js'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [isLoadingReview, setIsLoadingReview] = useState(false)
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false)

  const [isShowReviewModal, setIsShowReviewModal] = useState(null)

  const [features, setFeatures] = useState({
    level: '',
    vintageStatus: '',
    priceClass: '',
  })

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then((book) => {
        setBook(book)
        setReviews(book.reviews || [])
      })
      .catch((err) => {
        console.log(`Problem getting book.. ${err}`)
        showErrorMsg(`Problem getting book details..`)
        navigate('/book')
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
    if (pageCount > 200) return 'Decent Reading'
    return 'Light Reading'
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

  function onAddReview(newReview) {
    setIsLoadingReview(true)
    bookService
      .saveReview(book.id, newReview)
      .then((review) => {
        const updatedReviews = [review, ...reviews]
        setReviews(updatedReviews)
        setBook((prevBook) => ({...prevBook, reviews: updatedReviews}))
        onToggleReviewModal()
      })
      .catch((err) => {
        console.log(`Problem get review ${err}`)
        showErrorMsg(`Review to ${book.title} Failed!`).finally(() => setIsLoadingReview(false))
      })
      .finally(() => setIsLoadingReview(false))
  }

  function onRemoveReview(reviewId) {
    setIsLoadingReview(true)
    bookService
      .removeReview(book.id, reviewId)
      .then(() => {
        const filteredReviews = book.reviews.filter((review) => review.id !== reviewId)
        setBook({...book, reviews: filteredReviews})
      })
      .finally(() => setIsLoadingReview(false))
  }

  function onToggleReviewModal() {
    setIsShowReviewModal((prevIsReviewModal) => !prevIsReviewModal)
    setIsAddReviewOpen((prev) => !prev)
  }

  function onBack() {
    navigate('/book')
  }

  if (!book) return <AppLoader />

  return (
    <section className="book-details  main-layout flex flex-column">
      <p className="back-btn" onClick={onBack}>
        Back to library
      </p>
      <div className="book-header justify-center flex ">
        <h2 className="book-title">{book.title}</h2>
      </div>

      <div className="book-info flex mb-2">
        <img className="book-thumbnail" src={book.thumbnail} onError={getDefaultUrl} alt={`${book.title} cover`} />

        <div className="book-details-text flex flex-column justify-between mb-2">
          <h3 className="book-subtitle">{book.subtitle}</h3>
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
            <span className="bold">Categories: </span> {book.categories.join(', ')}
          </p>
        </div>
      </div>

      <div className="book-description mb-2">
        <LongTxtCSS txt={book.description} length={50} />
      </div>

      <div className={`book-price ${getPriceColorClass(book.listPrice.amount)} mb-2`}>
        <p>
          Price: {utilService.getCurrencySymbol(book.listPrice.currencyCode)} {book.listPrice.amount}
          {book.listPrice.isOnSale && <span className="sale"> On Sale</span>}
        </p>
      </div>

      <div className="brake-line "></div>

      <div>
        <button onClick={onToggleReviewModal}>{isShowReviewModal ? 'Close Review' : 'Add Review'}</button>
        {isShowReviewModal && <AddReview toggleReview={onToggleReviewModal} onAddReview={onAddReview} />}
      </div>
      {/* {isShowReviewModal && <AddReview toggleReview={onToggleReviewModal} onAddReview={onAddReview} />} */}

      <section className="reviews-container mb-2">
        <h3>Reviews</h3>
        {isLoadingReview ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
        )}
      </section>

      <section className="prev-next-btn flex justify-between">
        <button>
          <i className="fa-solid fa-arrow-left"></i>
          <Link to={`/book/${book.prevbookId}`}> Prev book</Link>
        </button>
        <button>
          <Link to={`/book/${book.nextbookId}`}>Next book </Link>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </section>
    </section>
  )
}
