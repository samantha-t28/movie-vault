# Movie Vault

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [System Architecture](#system-architecture)
4. [Technical Requirements](#technical-requirements)
5. [Functional Requirements](#functional-requirements)
6. [Non-Functional Requirements](#non-functional-requirements)
7. [The Difference Between HTML and JSX](#the-difference-between-html-and-jsx)

## Overview

Movie Vault is a movie database web service that allows users to find movie information and ratings for a wide range of movies. Users can also add movies to their “favorites” list.

## Features

-   Display featured movies on page load
-   Search for movies by title or actor
-   Mark movies as favorites
-   Add/remove movies from the favorites list
-   Navigate between home and favorites page
-   Option to choose between light/dark theme
-   Pagination for movie listings

## System Architecture

### Architecture Overview

The application will be using client-server architecture. The server will handle API requests and interact with external API, while the client will provide a user interface for interaction.

### Client-Side

-   **Technologies**: HTML, CSS, JavaScript
-   **Library**: React

### Server-Side

-   **Technologies**: Node.js, Express.js
-   **Proxy Server**: Express.js to handle API requests and secure the OMDBI API key.
-   **Environment Management**: Use environment variable to store API key.

### Interaction Flow

### 1. Client Request:

-   The client sends a request to the server for data (e.g., search results, movie information).
-   The client receives the data and renders it in their browser (e.g., display movie thumbnails, search results).

### 2. API Gateway Server

-   The server calls out to OMDB with an embeded API key (request).
-   Gets the response from OMDB.
-   Server then sends the response back to the client.

`Interaction Flow Chart Diagram`:

![interaction-flow-chart](https://github.com/samantha-t28/the-movie-vault-app/assets/96286575/1a54c126-804b-4200-9998-0a7accbb5bd2)

## Technical Requirements

### 1. Languages

-   HTML, CSS, JavaScript

### 2. Frameworks and Libraries

-   **Frontend**: React
-   **Backend**: Node.js, Express.js

### 3. Data Storage

-   Use local storage for user's favorite movies

### 4. API Integration

-   The application will use the OMDB (Open Movie Database) API to fetch movie data.

### 5. Hosting Environment

-   Vercel

## Functional Requirements

### 1. Home Page, Displays Featured Movies on Page Load

Upon loading the website, the page will automatically fetch and display a list of featured movies to provide immediate content for users.

-   **Movie Thumbnail Cards**: Image, title, year, runtime, genre, and ratings (star icons).
-   **User Interaction**: Clicking on a movie thumbnail will provide more detailed information about the movie.

### 2. Favorites Page

A dialog component (modal) for users to view their list of favorite movies.

-   Display all movies that the user has marked as favorites.
-   Allow users to remove movies from the favorites list by clicking the favorites icon on the movie thumbnail.

### 3. Movies Page

A seperate page that displays movie information (title, year, plot, ratings, director, and runtime).

### 4. Header

Navigation:

-   Buttons for accessing different pages.
-   Modal for viewing the list of favorite movies.

Search input field:

-   Display search results dynamically as the user types.

Toggle Light/Dark Theme:

-   Allows users to toggle between light and dark theme.
-   Store theme selection in local storage. Default to system theme if no selection is stored.
-   **Transition Effect**: Smoothly fades the background color within 0.3 seconds allows for a less abrupt and more visually pleasing effect.

Bookmark / Favorites Icon:

-   Ability to save movies in their “favorites” list.
-   Favorite movie thumbnails (icon) appears in the navigation bar. Ability to add and remove from favorites.
-   Use local storage to store favorites data.

### 5. Pagination

Implement pagination for movie listings.

-   Divide movie listings into pages with navigation controls.
-   Display a set numbers of movies per page (e.g., 8).

## Non-Functional Requirements

### 1. Security

-   **Prevent API Key Exposure**: The OMDB API key must be stored in an environment variable. This is to observe security best practices.

### 2. Usability Best Practices

-   Accessibility (alt text for screen readers)
-   Navigation bar
-   Search bar
-   Responsiveness (e.g., desktops, tablets, and mobile)

# The Difference Between HTML and JSX

**HTML** is the standard language used to create web pages. It uses elements like `<div>`, `<p>`, and `<a>` to structure and display content.

**JSX** (JavaScript XML) is a syntax extension that allows you to write HTML-like code directly within your JavaScript.

## Key Differences and Rules:

### 1. **Embedding in JavaScript:**

JSX allows you to embed JavaScript expressions by wrapping them in curly braces `{}`.

-   `{name}` is the JavaScript expression that evaluates to "Sam", and it's embedded within the JSX `<p>` element.

```javascript
const name = 'Sam';
const greeting = <p>Hello, {name}!</p>;
```

### 2. **Using JavaScript Logic:**

You can use curly braces to include JavaScript logic, such as if statements or ternary operators, directly inside JSX to conditionally render elements.

```javascript
const isLoggedIn = true;
const greeting = (
	<div>
		{isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
	</div>
);
```

### 3. **Return a Single Root Element:**

-   In JSX, you need to wrap child elements with a parent element, like `<div>...</div>`, or use a fragment `<>...</>` to group elements without adding extra nodes to the DOM.
-   In HTML, you can have multiple sibling elements without needing a wrapper.

#### Example in HTML:

```html
<div></div>
<div></div>
```

#### Example in JSX:

```javascript
// This will cause an error in JSX:
// return (
//   <div></div>
//   <div></div>
// );

// Correct way in JSX:
return (
   <div>
	  <div></div>
	  <div></div>
   </div>
);

// Or using a Fragment:
return (
   <>
	 <div></div>
	 <div></div>
   </>
);
```

### 4. **Self-closing Tags:**

All elements in JSX must be properly closed.

#### HTML:

```html
<img src="image.jpg">
```

#### JSX:

```javascript
const element = <img src="image.jpg" />;
```

### 5. **camelCase for Attribute Names:**

Using camelCase for attribute names in JSX helps distinguish them from HTML attributes and avoids conflicts with JavaScript reserved words. For example, instead of `class`, use `className`.

```javascript
// This will throw syntax error
const element = <div class="container">Hello</div>;
// This is correct and avoids conflict
const element = <div className="container">Hello</div>;
```
