import React from 'react';
import { Header } from './Header';
import { MovieCard } from './MovieCard';
import { Pagination } from './Pagination';

export const HomePage = ({
	movies,
	currentMovies,
	moviesPerPage,
	handleSearch,
	currentPage,
	paginate
}) => {
	return (
		<>
			<Header onSearch={handleSearch} />
			<main className="main-content" role="main">
				<section
					className="movies"
					aria-labelledby="featured-movies-title"
				>
					<h2 className="movies__title">Featured movies</h2>
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
							totalMovies={movies.length}
							paginate={paginate}
							currentPage={currentPage}
						/>
					</div>
				</section>
			</main>
		</>
	);
};
