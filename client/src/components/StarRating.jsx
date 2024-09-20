export const StarRating = ({ rating }) => {
    const star = '★'; // ★☆

    // Round to the nearest half
    const roundedRating = Math.round(rating) / 2;
    const fullStars = Math.floor(roundedRating);
    const halfStars = roundedRating % 1 !== 0;

    let emptyStars = 0;

    if (halfStars) {
        emptyStars = 5 - fullStars - 1;
    } else {
        emptyStars = 5 - fullStars;
    }

    return (
        <div
            className="movie-card__star-rating"
            aria-label={`${roundedRating} stars out of 5`}
        >
            Ratings:
            <span className="movie-card__star movie-card__star--full">
                {star.repeat(fullStars)}
            </span>
            <span className="movie-card__star movie-card__star--half">
                {star.repeat(halfStars)}
            </span>
            <span className="movie-card__star movie-card__star--empty">
                {star.repeat(emptyStars)}
            </span>
        </div>
    );
};
