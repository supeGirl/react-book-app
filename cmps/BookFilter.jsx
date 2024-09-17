const {useEffect, useState} = React

export function BookFilter({filterBy, onSetFilterBy}) {
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
//   console.log('filterBy', JSON.stringify(filterBy, null, 2))

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setFilterByToEdit((prevFilter) => ({...prevFilter, [field]: value}))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }
  const {txt, price} = filterByToEdit
  const isValid = txt

  return (
    <section className="book-filter container">
      <h2>Filter Our Books</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="txt">Title</label>
        <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" />

        <label htmlFor="price">Price</label>
        <input value={price || ''} onChange={handleChange} type="number" name="price" id="price" />

        <button disabled={!isValid}>Submit</button>
      </form>
    </section>
  )
}
