export const Movie = ({ title, image, year, rating }) => {
	const imageUrl = `https://image.tmdb.org/t/p/w500${image}`;

	return (
		<div className="movie-card">
			<div className="movie-card__image">
				<img src={imageUrl} alt="Inception movie poster" />
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
					aria-label="4 stars out of 5"
				>
					{rating}
					★★★★☆
				</div>
			</div>
		</div>
	);
};
