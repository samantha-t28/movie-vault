# Movie Vault
Movie Vault is a movie database web service that allows users to find movie information and ratings for a wide range of movies. Users can also add movies to their “favorites” list.

<img width="880" height="620" alt="movie-vault-image" src="https://github.com/user-attachments/assets/a2a6e68b-47e1-4fa9-a352-a10ee16b3ce8" />


## Table of Contents

1. [Features](#features)
2. [Project Overview](#project-overview)
3. [Technical Requirements](#technical-requirements)
4. [Learning Journal](LEARNING_JOURNAL.md)


## Features

-   Display featured movies on page load - :white_check_mark:
-   Search for movies by title or actor - :white_check_mark:
-   Navigate between home and favorites page - :white_check_mark:
-   Option to choose between light/dark theme - :white_check_mark:
-   Pagination for movie listings - :white_check_mark:
-   Mark movies as favorites - :construction: (work in progress)
-   Add/remove movies from the favorites list - :construction: (work in progress)

## Project Overview

The application will be using client-server architecture. The server will handle API requests and interact with external API, while the client will provide a user interface for interaction.

### Client-Side

- **Technologies**: HTML, CSS, JavaScript
- **Library**: React

### Server-Side

- **Technologies**: Node.js, Express.js
- **Proxy Server**: Express.js to handle API requests and secure the TMDBI API key.
- **Environment Management**: Use environment variable to store API key.

## Interaction Flow

### 1. Client Request:

-   The client sends a request to the server for data (e.g., search results, movie information).
-   The client receives the data and renders it in their browser (e.g., display movie thumbnails, search results).

### 2. API Gateway Server

-   The server calls out to TMDB with an embeded API key (request).
-   Gets the response from TMDB.
-   Server then sends the response back to the client.

`Interaction Flow Chart Diagram`:

![interaction-flow-chart](https://github.com/samantha-t28/the-movie-vault-app/assets/96286575/1a54c126-804b-4200-9998-0a7accbb5bd2)

## Technical Requirements

- **Frontend:** React
- **Backend**: Node.js, Express.js


### Data & API

- **Local Data:** Use local storage for user's favorite movies
- **External Data:** Use TMDB API to fetch movie data





