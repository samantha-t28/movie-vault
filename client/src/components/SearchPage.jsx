import React from 'react';
import { MovieCard } from './MovieCard';
import { Header } from './Header';

export const SearchPage = ({ searchResults, handleSearch }) => {
	return (
		<>
			<Header onSearch={handleSearch} />
			<main className="main-content" role="main">
				<section
					className="movies"
					aria-labelledby="search-results-title"
				>
					<h2 className="movies__title">Search Results</h2>
					<div className="movies__grid">
						{searchResults.map(movie => (
							<MovieCard
								key={movie.id}
								title={movie.title}
								year={movie.release_date.split('-')[0]}
								image={movie.poster_path}
								rating={movie.vote_average.toFixed(1)}
							/>
						))}
					</div>
				</section>
			</main>
		</>
	);
};
