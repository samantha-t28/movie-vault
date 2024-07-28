import { useEffect, useState } from 'react';
import { MovieCard } from './components/MovieCard';
import { Pagination } from './components/Pagination';
import { Header } from './components/Header';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const moviesPerPage = 8;

	// const movies = await getServer();
	useEffect(() => {
		fetch('/api')
			.then(response => response.json())
			.then(data => setMovies(data.results || []))
			.catch(error => console.error('Error fetching movies:', error));

		console.log('hello');
	}, []);

	const handleSearch = searchResults => {
		setMovies(searchResults);
		setCurrentPage(1); // Reset to first page on new search
	};

	// // Pagination
	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

	// Page change
	const paginate = pageNumber => setCurrentPage(pageNumber);

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
}

export default App;
