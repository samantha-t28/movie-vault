import React from 'react';
import { MovieCard } from './MovieCard';
import { Header } from './Header';
import { Pagination } from './Pagination';

export const SearchPage = ({
	moviesPerPage,
	paginate,
	currentPage,
	currentMovies,
	searchResults,
	handleSearch
}) => {
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
						{currentMovies.map(movie => (
							<MovieCard
								key={movie.id}
								title={movie.title}
								year={movie.release_date.split('-')[0]}
								image={movie.poster_path}
								rating={movie.vote_average.toFixed(1)}
							/>
						))}
					</div>
					<div>
						<Pagination
							moviesPerPage={moviesPerPage}
							totalMovies={searchResults.length}
							paginate={paginate}
							currentPage={currentPage}
						/>
					</div>
				</section>
			</main>
		</>
	);
};
