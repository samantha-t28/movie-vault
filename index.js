import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = 3000;

// POST method route
app.get('/api', searchHandler);

async function searchHandler(request, response) {
	try {
		const tmdbResponse = await fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=avatar`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			}
		);
		const tmdbResponseJSON = await tmdbResponse.json();
		console.log(tmdbResponseJSON);
		response.send(tmdbResponseJSON);
	} catch (error) {
		response.send(
			'An error occured while attempting to fetch the TMDB API.'
		);
	}
}

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
