export const Movie = ({ title }) => {
	return (
		<div className="movie-card">
			<div className="movie-card__image">
				<img
					src="/inception-movie-poster.png"
					alt="Inception movie poster"
				/>
				<button
					className="movie-card__favorite"
					aria-label="Add to favorites"
				>
					<i className="fas fa-heart"></i>
				</button>
			</div>
			<div className="movie-card__details">
				<h3 className="movie-card__title">{title} (2010)</h3>
				<p className="movie-card__genre">Action, Adventure, Sci-Fi</p>
				<div
					className="movie-card__rating"
					aria-label="4 stars out of 5"
				>
					★★★★☆
				</div>
			</div>
		</div>
	);
};
