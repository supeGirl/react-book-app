const {useState} = React

export function AddReview({onAddReview}) {
  const [review, setReview] = useState({
    fullName: '',
    rating: 1,
    readAt: '',
  })

  function handleChange({target}) {
    const {name, value} = target
    setReview((prevReview) => ({...prevReview, [name]: value}))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    if (!review.fullName || !review.readAt) return
    onAddReview(review)
    setReview({fullName: '', rating: 1, readAt: ''})
  }
  return (
    <section className="add-review">
      <h3>Add a Review</h3>
      <form onSubmit={onSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={review.fullName} onChange={handleChange} placeholder="Your name" />
        </label>

        <label>
          Rating:
          <select name="rating" value={review.rating} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star}
              </option>
            ))}
          </select>
        </label>

        <label>
          Read At:
          <input type="date" name="readAt" value={review.readAt} onChange={handleChange} />
        </label>

        <button type="submit">Add Review</button>
      </form>
    </section>
  )
}
