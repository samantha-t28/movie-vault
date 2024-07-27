import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// GET method route
app.get('/api', searchHandler);

async function searchHandler(request, response) {
	try {
		const tmdbResponse = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			}
		);
		const tmdbResponseJSON = await tmdbResponse.json();
		console.log(tmdbResponseJSON);
		response.send(tmdbResponseJSON);
	} catch (error) {
		console.error('Error fetching movies:', error);
		response
			.status(500)
			.send('An error occurred while attempting to fetch the TMDB API.');
	}
}

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
