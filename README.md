# The Movie Vault

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Functional Requirements](#functional-requirements)
4. [Non-Functional Requirements](#non-functional-requirements)
5. [Technical Requirements](#technical-requirements)
6. [System Architecture](#system-architecture)


## Overview
Movie Vault is a movie database web service that allows users to find movie information and ratings for a wide range of movies. Users can also add movies to their “favorites” list.

## Features

* Display featured movies on page load
* Search for movies by title or actor
* Mark movies as favorites
* Add/remove movies from the favorites list
* Navigate between home and favorites page
* Option to choose between light/dark theme
* Pagination for movie listings

## Functional Requirements

### 1. Display Featured Movies on Page Load
Upon loading the website, the page will automatically fetch and display a list of featured movies to provide immediate content for users.

* **Movie Thumbnail Cards**: Image, title, year, runtime, genre, and ratings (star icons).
* **User Interaction**: Clicking on a movie thumbnail will provide more detailed information about the movie.

### 2. Search Bar
Allow users to search for movies by title or actor.

* Search input field.
* Display search results dynamically as the user types.

### 3. Bookmark / Favorites Icon
Allow users to save movies in their “favorites” list.

* Favorites icon on movie thumbnails and on the navigation bar. Clicking the icon adds/removes the movie from the favorites list.
* Use local storage to ensure it remains available across sessions.

### 4. Favorites Page
A dedicated page where users can view their list of favorite movies.

* Display all movies that the user has marked as favorites.
* Allow users to remove movies from the favorites list.

### 5. Navigation
Enable users to navigate between different pages.

* **Pages**: Home (featured movies), Movie (detailed info), Favorites (favorites movies list)
* Navigation bar for accessing different pages

### 6. Toggle Light/Dark Theme
Allow users to toggle between light and dark theme.

* Store theme selection in local storage. Default to system theme if no selection is stored.
* Enhances the user experience by allowing users to choose a visual theme that suits their preferences or reduces eye strain.
* **Transition Effect**: Smoothly change the background color within 0.3 seconds to make the transition less abrupt and more visually pleasing


### 7. Pagination
Implement pagination for movie listings.

* Divide movie listings into pages with navigation controls.
* Display a set numbers of movies per page (e.g., 8).
* Fetch and display the correct page of movies when users click on pagination controls.

## Non-Functional Requirements

### 1. Security
* **Prevention of API Key Exposure**: To mitigate security risks and protect sensitive information, the API key for the OMDB API must be stored in environment variables. This adheres to security best practices.

### 2. Usability
* **User Interface**: The UI should be intuitive and user-friendly.

### 3. Responsiveness
* The application should be responsive across a wide range of devices (desktops, tablets, and mobile). Ensures that the application will be usable, providing a better user experience.

## Technical Requirements

### 1. Programming Language
* JavaScript, HTML, CSS

### 2. Frameworks and Libraries 
* **Frontend**: React
* **Backend**: Node.js, Express.js

### 3. Build Tool
* **Vite**: For building and optimizing the React application.

### 4. Data Storage
* Use local storage for user's favorite movies

### 5. API Integration
* The application will use the OMDB (Open Movie Database) API to fetch movie data.
* Fetch featured movies and search movies by title or actor.
* **Error Handling**: Display an error message if the API call fails or returns no results.


## System Architecture

### Architecture Overview
The application will be built using a client-server architecture. The server will handle API requests and interact with external API, while the client will provide a user interface for interaction.

### Client-Side
* **Technologies**: HTML, CSS, JavaScript
* **Framework**: React

### Server-Side
* **Technologies**: Node.js, Express.js
* **Proxy Server**: Express.js to handle API requests and secure OMDBI API key.
* **Environment Management**: Use environment variables to store API key.

### Interaction Flow

### 1. Client Requests:
* The client sends a request to the server for data (e.g., search results, movie information).

### 2. Proxy Server Handling:
* The proxy server appends the API key to the request and securely interact with the external API.

### 3. External API Interaction:
* OMDB API processes the request and sends back the movie data to the server.

### 4. Server Response:
* Server receives the response from the API and then sends the data back to the client.

### 5. Client Rendering:
* The client receives the data and renders it on the user interface (e.g., display movie thumbnails, search results).
