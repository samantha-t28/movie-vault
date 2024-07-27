export const Movie = ({ title, image, year, rating }) => {
	// Check to see if image source is avaliable. If not, set it to null
	const imageUrl = image ? `https://image.tmdb.org/t/p/w500${image}` : null;

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
					className="movie-card__rating"
					aria-label={`${rating} stars out of 10`}
				>
					Ratings: {rating} / 10
				</div>
			</div>
		</div>
	);
};
