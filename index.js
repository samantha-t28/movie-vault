import express from 'express';
import dotenv from 'dotenv';
import { setTimeout as sleep } from 'node:timers/promises';
import genresList from './server/genre.json' assert { type: 'json' };

dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET method to fetch popular movies
app.get('/api', popularMoviesHandler);

// POST method to handle search queries
app.post('/api', searchHandler);

// Populate featured movies on page load
async function popularMoviesHandler(request, response) {
	console.log('Entered popularMoviesHandler()');

	try {
		const tmdbResponse = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			}
		);
		const tmdbResponseJSON = await tmdbResponse.json();

		const parsedResults = tmdbResponseJSON.results.map(movie => {
			let genreStorage = [];
			movie.genre_ids.map(genreId => {
				console.log('GID:', genreId);

				genresList.genres.map(genre => {
					console.log('hello', genre.id);
					console.log('hello222', genre.name);
					if (genreId === genre.id) {
						console.log('match:', genreId, genre.id);
						genreStorage.push(genre.name);
					}
				});
			});
			movie.genres = genreStorage;
			return movie;
		});

		tmdbResponseJSON.results = parsedResults;
		await sleep(3000);
		// Intentionally added throw new Error to test and display the error message
		// throw new Error('Render Error');
		response.send(tmdbResponseJSON);
	} catch (error) {
		console.error('Error fetching popular movies:', error);
		response
			.status(500)
			.send(
				'An error occurred while attempting to fetch popular movies.'
			);
	}
}

async function searchHandler(request, response) {
	console.log('Entered searchHandler()');
	const { query, currentPage } = request.body;
	console.log('Received data: ', query);

	if (!query) {
		return response.status(400).send('Query parameter is required');
	}

	try {
		const tmdbResponse = await fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${
				process.env.TMDB_API_KEY
			}&query=${query}&page=${currentPage || 1}`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			}
		);
		const tmdbResponseJSON = await tmdbResponse.json();

		const parsedResults = tmdbResponseJSON.results.map(movie => {
			let genreStorage = [];
			movie.genre_ids.map(genreId => {
				genresList.genres.map(genre => {
					if (genreId === genre.id) {
						genreStorage.push(genre.name);
					}
				});
			});
			movie.genres = genreStorage;
			return movie;
		});
		response.send(tmdbResponseJSON);
	} catch (error) {
		console.error('Error fetching search results:', error);
		response
			.status(500)
			.send(
				'An error occurred while attempting to fetch search results.'
			);
	}
}

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
