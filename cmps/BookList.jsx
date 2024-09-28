const {Link} = ReactRouterDOM
import {BookPreview} from './BookPreview.jsx'

export function BookList({books, onRemoveBook}) {
  return (
    <ul className="book-list clean-list grid">
      {books.map((book) => {
        return (
          <li key={book.id}>
            <BookPreview book={book} />
            <section className="book-action-btn">
              <button>
                <Link to={`/book/${book.id}`}>Details</Link>
              </button>
              <button>
                <Link to={`/book/edit/${book.id}`}>Edit</Link>
              </button>
              <button onClick={() => onRemoveBook(book.id)}>Remove</button>
            </section>
          </li>
        )
      })}
    </ul>
  )
}
