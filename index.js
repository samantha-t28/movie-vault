import express from 'express';
import dotenv from 'dotenv';

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
