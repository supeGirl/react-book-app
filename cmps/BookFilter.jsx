const {useEffect, useState} = React

export function BookFilter({filterBy, onSetFilterBy}) {
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

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
    setFilterByToEdit((prevFilter) => ({...prevFilter, [field]: value}))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
    toggleFilter()
  }
  const {title, maxPrice, minPrice, category, isOnSale} = filterByToEdit

  function isValidFilter() {
    return (
      title ||
      category ||
      typeof isOnSale === 'boolean' ||
      (typeof maxPrice === 'number' && maxPrice >= 0) ||
      (typeof minPrice === 'number' && minPrice >= 0)
    )
  }

  function toggleFilter() {
    setIsExpanded((prevExpanded) => !prevExpanded)
  }
  if (!filterBy) return <h1>No much found</h1>
  return (
    <section className={`book-filter container ${isExpanded ? 'expanded' : ''}`}>
      <h2>Filter Our Books</h2>

      <button className="filter-toggle-btn" type="button" onClick={toggleFilter}>
        {isExpanded ? <i className="fa-solid fa-sort-up"></i> : <i className="fa-solid fa-sort-down"></i>}
      </button>

      {/* Modal overlay for the background effect */}
      <div className="modal-overlay" onClick={toggleFilter}></div>
      <div className="modal-container">
      <button className="close-btn" type="button" onClick={toggleFilter}>
      &times;
    </button>

        <form onSubmit={onSubmit} className="filter-form flex flex-column">
          <div className="extra-filters">
            <div className="filter-max-price flex flex-column mb-2">
              <label htmlFor="maxPrice">Max Price:</label>
              <input
                value={maxPrice || ''}
                onChange={handleChange}
                type="number"
                name="maxPrice"
                id="maxPrice"
                placeholder="Enter max price"
              />
            </div>

            <div className="filter-min-price flex flex-column mb-2">
              <label htmlFor="minPrice">Min Price: </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={minPrice || ''}
                onChange={handleChange}
                placeholder="Enter min price"
              />
            </div>

            <div className="filter-by-title flex flex-column mb-2">
              <label htmlFor="title">Title:</label>
              <input
                value={title}
                onChange={handleChange}
                type="text"
                name="title"
                id="title"
                placeholder="Search by title"
              />
            </div>

            <div className="filter-by-category flex flex-column">
              <label htmlFor="category">Category: </label>
              <select id="category" name="category" value={category} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Computers">Computers</option>
                <option value="Hack">Hack</option>
              </select>
            </div>

            <div className="filter-by-sale flex align-center mb-2">
              <input
                className="checkbox mr-2"
                type="checkbox"
                id="isOnSale"
                name="isOnSale"
                checked={isOnSale}
                onChange={handleChange}
              />
              <label htmlFor="isOnSale">On Sale</label>
            </div>
          </div>

          <button className="submit-button" disabled={!isValidFilter()}>
            Apply
          </button>
        </form>
      </div>
    </section>
  )
}
