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

	// let searchQuery = request.query.query;
	// console.log(searchQuery);
	try {
		const tmdbResponse = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			}
		);
		const tmdbResponseJSON = await tmdbResponse.json();
		// TO DO TASK:
		const parsedResults = tmdbResponseJSON.results.map(movie => {
			// movie.genres = ['action'];
			// console.log('HELLO:', movie.genre_ids);
			// // console.log('Hello2:', genresList);

			// genresList.genres.map(gen => {
			// 	console.log('hello', gen.id);
			// 	console.log('hello222', gen.name);
			// });

			let genreStorage = [];
			movie.genre_ids.map(gid => {
				console.log('GID:', gid);

				genresList.genres.map(gen => {
					console.log('hello', gen.id);
					console.log('hello222', gen.name);
					if (gid === gen.id) {
						console.log('match:', gid, gen.id);
						genreStorage.push(gen.name);
					}
				});
			});
			movie.genres = genreStorage;
			return movie;
			// we can see it from client log and server side
		});
		// console.log('calling for:', parsedResults);
		tmdbResponseJSON.results = parsedResults;
		await sleep(3000);
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
	const { query } = request.body;
	console.log('Received data: ', query);

	if (!query) {
		return response.status(400).send('Query parameter is required');
	}

	try {
		const tmdbResponse = await fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			}
		);
		const tmdbResponseJSON = await tmdbResponse.json();
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
