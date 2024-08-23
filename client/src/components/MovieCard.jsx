import { StarRating } from './StarRating';

export const MovieCard = ({ title, image, year, rating, genre }) => {
	const star = '★'; // ★☆

	// Check to see if image source is avaliable. If not, set it to null
	const imageUrl = image ? `https://image.tmdb.org/t/p/w500${image}` : null;

	// Round to the nearest half
	const roundedRating = Math.round(rating) / 2; // these are solid stars
	console.log('rounded rating', roundedRating, title);

	const fullStars = Math.floor(roundedRating);
	console.log('aaaaaafull stars', fullStars);
	const halfStars = roundedRating % 1 !== 0;

	console.log('half stars', halfStars);

	// how many half stars do i have?
	// only possibles scenarios is either 1 or 0

	let emptyStars = 0;

	if (halfStars) {
		emptyStars = 5 - fullStars - 1;
		// emptyStars -= 1;
		console.log('is this working?');
	} else {
		emptyStars = 5 - fullStars;
	}

	console.log('empty stars', emptyStars);

	return (
		<div className="movie-card">
			<div className="movie-card__image">
				{/* If imageUrl is available, display the image. Otherwise, show a "Image not available" message with the "no-image" CSS style */}
				{imageUrl ? (
					<img src={imageUrl} alt={`${title} movie poster`} />
				) : (
					<div className="movie-card__no-image">
						Image not available
					</div>
				)}
				<button
					className="movie-card__favorite"
					aria-label="Add to favorites"
				>
					<i className="fas fa-heart"></i>
				</button>
			</div>
			<div className="movie-card__details">
				<h3 className="movie-card__title">
					{title} {year}
				</h3>
				<div
					className="star-rating"
					aria-label={`${rating} stars out of 5`}
				>
					Ratings:
					<span className="full-star">{star.repeat(fullStars)}</span>
					<span className="half-star">{star.repeat(halfStars)}</span>
					<span className="empty-star">
						{star.repeat(emptyStars)}
					</span>
				</div>
				<p className="movie-card__genre">{genre}</p>
			</div>
		</div>
	);
};
