import {bookService} from '../services/book.service.js'

const {useState, useEffect} = React
const {useNavigate, useParams} = ReactRouterDOM

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const {bookId} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    
    if (bookId) loadBook()
  }, [])

  function loadBook() {
    
    bookService
      .get(bookId)
      .then(setBookToEdit)
      .catch((err) => {
        console.error(`Had issues loading editor... ${err}`)
        showErrorMsg(`Problems loading editor..`)

        navigate('/book')
      })
  }

  function handleChange({target}) {
    const {name: field, type} = target
    let {value} = target

    switch (type) {
      case 'number':
      case 'range':
        value = +value 
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
    bookService.save(bookToEdit)
    .then(book=>{})
    .catch(err => {
      console.log(`problem saving book ${err}`)
      showErrorMsg(`Problem saving book..`)

    })
    .finally(()=> {
      navigate('/book')
      showSuccessMsg(`Book saved successfully!`)
    })

  }

  if (!bookToEdit) return <h1>Loading....</h1>
  return (
    <section className="book-edit">
      <h2>Edit Book</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={bookToEdit.title} onChange={handleChange} required />
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
          <input
            type="checkbox"
            id="isOnSale"
            name="listPrice.isOnSale"
            checked={bookToEdit.listPrice.isOnSale}
            onChange={handleChange}
          />
          <label htmlFor="isOnSale"> On Sale</label>
        </div>

        <div className="form-actions">
          <button type="submit">Save</button>

        </div>
      </form>
    </section>
  )
}
