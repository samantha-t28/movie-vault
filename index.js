import express from 'express';

const app = express();
const port = 3000;

// POST method route
app.get('/api', searchHandler);

async function searchHandler(request, response) {
	try {
		const omdbResponse = await fetch(
			`http://www.omdbapi.com/?s=avatar&apikey=${process.env.OMDB_API_KEY}&type=movie`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			}
		);
		const omdbResponseJSON = await omdbResponse.json();
		console.log(omdbResponseJSON);
		response.send(omdbResponseJSON);
	} catch (error) {
		response.send('error');
	}
}

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
