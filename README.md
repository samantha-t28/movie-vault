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

- **Technologies**: HTML, CSS, JavaScript
- **Library**: React

### Server-Side

- **Technologies**: Node.js, Express.js
- **Proxy Server**: Express.js to handle API requests and secure the TMDBI API key.
- **Environment Management**: Use environment variable to store API key.

### Interaction Flow

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

### 1. Languages

-   HTML, CSS, JavaScript

### 2. Frameworks and Libraries

-   **Frontend**: React
-   **Backend**: Node.js, Express.js

### 3. Data Storage

-   Use local storage for user's favorite movies

### 4. API Integration

-   The application will use the TMDB (Open Movie Database) API to fetch movie data.

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

-   **Prevent API Key Exposure**: The TMDB API key must be stored in an environment variable. This is to observe security best practices.

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
## Setting Up TMDB API Key for Development

1. Visit https://www.themoviedb.org/
2. Create an account or log in if you already have one.
3. In the settings menu, click "API".
4. Click "Apply for API Key" and fill in the requirements of how you intend to use the API. Then click "submit form".
5. After your application is approved, your API key will be displayed in the API section.

**Note:** This project uses TMDB API v3.

## Configure the API Key in Your Project

1. In the root directory, create a new file named '.env'.
2. Open the '.env' file and add the following line:
```bash
TMDB_API_KEY=your_api_key
```
3. Replace `your_api_key` with the actual API key you copied from TMDB.
4. Install `dotenv` package:
```bash
npm install dotenv
```
5. Load the environment variables at the beginning of your main file (e.g., `index.js`):
```javascript
import dotenv from 'dotenv';
dotenv.config();
```
6. Access the API Key in your code, use `process.env.TMDB_API_KEY`.

## The Importance Of The `key` Property and Its Effect On React Lists

The key prop plays a crucial role in React as it helps manage lists of elements. It allows React to uniquely identify each element, ensuring that it can render properly in the DOM. By providing unique keys for each element, React can efficiently update and manage the elements in a list, leading to better performance and accurate rendering.

The effect of the 'key' prop:

* When new element is added to a list, React uses the keys to identify which elements have changed, been added or removed.
* This allows React to update only the changed elements without re-rendering the entire list.

#### Example:
```javascript
<ul>
	<li key="1">Strawberry</li>
	<li key="2">Grape</li>
	<li key="3">Passion Fruit</li>
	<li>Orange</li>
</ul>
```
The `Orange` element does not have a key. As a result, React will re-render the entire list because it doesn't know that `Orange` is a new addition to the list.