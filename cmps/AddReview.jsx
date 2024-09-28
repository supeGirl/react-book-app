import {StarRating} from './dynamic-inputs/StarRating.jsx'
import {TextboxRating} from './TextboxRating.jsx'
import {SelectRating} from './dynamic-inputs/SelectRating.jsx'
const {useState, useRef, useEffect} = React

export function AddReview({onAddReview, toggleReview}) {
  const inputRef = useRef()

  const [review, setReview] = useState({
    date: new Date().toISOString().slice(0, 10),
    fullName: 'new name',
    rating: 0,
    txt: '',
    selected: 0,
  })

  const {date, fullName, txt, rating} = review

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  function handleChange({target}) {
    const {name, value} = target
    setReview((prevReview) => ({...prevReview, [name]: value}))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onAddReview(review)
    toggleReview()
  }
  return (
    <section className="add-review">
      <div className="review-modal">
      <button
        className="btn-toggle-modal"
        onClick={toggleReview}
        aria-label="Close Review Modal" // Accessibility
      >
        X
      </button>
        <h1>Add review</h1>

        <form onSubmit={onSubmit} className="review-form">
          <label className="bold-txt" htmlFor="fullname">
            Full name:
          </label>
          <input
            autoFocus
            ref={inputRef}
            placeholder="Enter full name"
            name="fullName"
            type="text"
            id="fullname"
            value={fullName}
            onChange={handleChange}
            autoComplete="off"
            className="input-field name"
          />

          <label className="bold-txt" htmlFor="date">
            Date:
          </label>

          <input className="input-field date" type="date" id="date" name="date" value={date} onChange={handleChange} />

          <div className="rate-by-choice">
            <p className="bold-txt">Select rating type:</p>
          </div>

          <StarRating handleChange={handleChange} rating={rating} />
          {/* <SelectRating handleChange={handleChange} rating={rating} /> */}
          <TextboxRating handleChange={handleChange} txt={txt} />

          <button type="submit" className="btn-save">
            Save
          </button>
        </form>
      </div>
    </section>
  )
}
