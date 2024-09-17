import {BookPreview} from './BookPreview.jsx'

export function BookList({books, onSelectedBookId}) {
  return (
    <ul className="book-list clean-list grid">
      {books.map((book, idx) => {
        const imgNum = idx + 1
        return (
          <li key={book.id}>
            <BookPreview book={book} imgNum={imgNum} />
            <section>
              <button onClick={() => onSelectedBookId(book.id, imgNum)}>Details</button>
            </section>
          </li>
        )
      })}
    </ul>
  )
}
