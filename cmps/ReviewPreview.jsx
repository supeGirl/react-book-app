import { StarRating } from "./dynamic-inputs/StarRating.jsx"


export function ReviewPreview({ review, onRemoveReview }) {
    return <section className='review-details'>
        <h4>{review.fullName}</h4>
        <h5>{review.date}</h5>
        {review.rating !== 0 && <h4><StarRating rating={review.rating} /></h4>}
        <p>{review.txt}</p>
        {review.selected !== 0 && <p>Book rate: {review.selected}/5</p>}
        <button className="btn-remove-review" onClick={() => onRemoveReview(review.id)}>x</button>
    </section>
}