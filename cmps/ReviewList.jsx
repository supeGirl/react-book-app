import { ReviewPreview } from "../cmps/ReviewPreview.jsx"

export function ReviewList({ reviews = [], onRemoveReview }) {
    

    return (
        <div>
            <h3>Users recommend:</h3>
            {reviews.map((review,idx) =>
                <ReviewPreview
                    key={review.id || idx}
                    review={review}
                    onRemoveReview={onRemoveReview}
                />
            )}
        </div>
    )
}