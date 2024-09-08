import React from 'react';
import { Header } from './Header';
import { MovieCard } from './MovieCard';
import { Pagination } from './Pagination';
import { useQuery } from '@tanstack/react-query';

const popularMovies = () => {
	return (
		fetch('/api')
			// .then(response => response.json())
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				// const responseText = await response.text();
				// throw new Error(responseText);
				throw new Error('Throwing new Error');
			})
		// .then(data => setMovies(data.results || []))
		// .catch(error => console.error('Error fetching movies:', error))
	);
};
export const HomePage = ({
	movies,
	currentMovies,
	currentPage,
	moviesPerPage,
	handleSearch,
	paginate
}) => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ['popularMovies'],
		queryFn: popularMovies
	});
	// console.log(data);
	// console.log(error);

	return (
		<>
			<Header onSearch={handleSearch} />
			<main className="main-content" role="main">
				<section
					className="movies"
					aria-labelledby="featured-movies-title"
				>
					<h2 className="movies__title">Featured movies</h2>
					{isError && <div>Opps Error! {error.message}</div>}
					{isPending && <div>Loading...</div>}
					{data && data.results && (
						<div className="movies__grid">
							{data.results.map(movie => (
								<MovieCard
									key={movie.id}
									title={movie.title}
									year={movie.release_date.split('-')[0]}
									image={movie.poster_path}
									rating={movie.vote_average.toFixed(1)}
									genre={movie.genres.join(', ')}
								/>
							))}
						</div>
					)}
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
