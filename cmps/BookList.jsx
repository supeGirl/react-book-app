import {BookPreview} from './BookPreview.jsx'

export function BookList({books, onSelectedBookId}) {
  return (
    <ul className="book-list clean-list grid">
      {books.map((book) => {
        return (
          <li key={book.id}>
            <BookPreview book={book} />
            <section>
              <button onClick={() => onSelectedBookId(book.id)}>Details</button>
            </section>
          </li>
        )
      })}
    </ul>
  )
}
