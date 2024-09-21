import {bookService} from '../services/book.service.js'

const {useState, useEffect} = React

export function BookEdit({bookId, onSaveBook, onBack}) {
  const [bookToEdit, setBookToEdit] = useState(null)

  console.log('bookToEdit', bookToEdit)

  useEffect(() => {
    loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => {
        setBookToEdit(book)
      })
      .catch((err) => {
        console.error(`Had issues loading editor... ${err}`)
      })
  }

  function handleChange({target}) {
    const {name: field, type} = target
    let {value} = target

    switch (type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break
    }

    setBookToEdit((prevBook) => {
      if (field.startsWith('listPrice')) {
        const updateField = field.split('.')[1]
        return {
          ...prevBook,
          listPrice: {
            ...prevBook.listPrice,
            [updateField]: value,
          },
        }
      }

      return {
        ...prevBook,
        [updateField]: value,
      }
    })
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onSaveBook(bookToEdit)
  }

  if(!bookToEdit) return <h1>Loading....</h1>
  return(
    <section className="book-edit">
    <h2>Edit Book</h2>
    <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={bookToEdit.title}
                onChange={handleChange}
                required
            />
        </div>

        <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                name="listPrice.amount"
                value={bookToEdit.listPrice.amount}
                onChange={handleChange}
                required
            />
        </div>

        <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                name="description"
                value={bookToEdit.description}
                onChange={handleChange}
                required
            ></textarea>
        </div>

        <div className="form-group">
            <label htmlFor="authors">Authors:</label>
            <input
                type="text"
                id="authors"
                name="authors"
                value={bookToEdit.authors.join(', ')}
                onChange={handleChange}
                required
            />
        </div>

        <div className="form-group">
            <label htmlFor="publishedDate">Published Date:</label>
            <input
                type="number"
                id="publishedDate"
                name="publishedDate"
                value={bookToEdit.publishedDate}
                onChange={handleChange}
                required
            />
        </div>

        <div className="form-group">
            <label htmlFor="categories">Categories:</label>
            <input
                type="text"
                id="categories"
                name="categories"
                value={bookToEdit.categories.join(', ')}
                onChange={handleChange}
                required
            />
        </div>

        <div className="form-group-checkbox">
            <label htmlFor="isOnSale">On Sale:</label>
            <input
                type="checkbox"
                id="isOnSale"
                name="listPrice.isOnSale"
                checked={bookToEdit.listPrice.isOnSale}
                onChange={handleChange}
            />
        </div>

        <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onBack}>Back</button>
        </div>
    </form>
</section>
  )
}
