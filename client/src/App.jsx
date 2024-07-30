import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { SearchPage } from './components/SearchPage';
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
		console.log('Search Results:', searchResults);
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
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<HomePage
							movies={movies}
							currentMovies={currentMovies}
							moviesPerPage={moviesPerPage}
							currentPage={currentPage}
							paginate={paginate}
							handleSearch={handleSearch}
						/>
					}
				/>
				<Route
					path="/search"
					element={
						<SearchPage
							searchResults={movies}
							handleSearch={handleSearch}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
