# Learning Journal
This file is to document the development process and key learnings for this project.

## June 12, 2025

### Topic: Building a Dynamic Pagination Component from Scratch

#### Problem/Goal:
The initial goal was to create a basic pagination display. The first implementation successfully rendered a hard-coded view showing the first six pages, an ellipsis, and the final page number (e.g., 1 2 3 4 5 6 ... 40).

However, the core problem was that this implementation was static—it did not dynamically re-render when a new page was selected. This design flaw became obvious during testing: when the last page was clicked, the control failed to update to show the preceding pages. This oversight made it impossible to navigate backward from the end, effectively making the component non-functional beyond the initial view.

#### Solution & Process:
I refactored the entire component to be dynamic using React hooks. The core logic now lives inside a `useEffect` hook that watches for changes in `currentPage` and `totalPages`.

This effect calculates a small, relevant "window" of pages to display. It handles three main states:
1.  When the user is at the **start** of the page range.
2.  When the user is in the **middle**, showing neighbor pages and ellipses.
3.  When the user is at the **end** of the page range.

#### Key Learnings
- **Building from Scratch vs. Using a Library:** This component was built manually by choice to understand the core logic behind client-side pagination, rather than immediately implementing a pre-built library.
- **Developing Problem-Solving Skills:** The main goal was to practice a key development skill: breaking a large problem into smaller, manageable parts (start, middle, and end states).
- **Future Goal - Intergrating a Library:** For my next goal, I will replace this custom component with a third-party library. This will be good practice for another key skill: integrating and customizing external code.

## July 09, 2024

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

# Development Dependencies for React Project

`@react`

React dependencies handles the following:

- Manage state
- Lifecycle Methods: mounting, updating, unmounting
- Context: share data globally without passing props manually through every level.
- Performance: useMemo and useCallback (Hooks) to memorize values and functions to avoid unnecessary re-renders.
- Refs: Directly access and manipulate DOM elements or store mutable values.


`@react-dom`

- Provide methods to render React components into the DOM.
- Updates the DOM when component state or props change.

`@types/react`

- Includes React core functionality such as creating components, managing state and props, lifecycle methods, hooks, and JSX.
- Enables autocomplete and type checking to ensure the types of variables, function parameters, and return values match the expected types.

`@types/react-dom`

- Covers React DOM APIs such as rendering components to the DOM and handling events related to the DOM.

`@vitejs/plugin-react`

- A Vite plugin build tool that enables fast refresh in development.

`@eslint`

- Checks for errors such as typos in variable names or incorrect syntax.
- Automates code formatting, such as correcting indentation or adding missing semicolons.

`@eslint-plugin-react`

- Plugin that enforces React best practices, such as ensuring components are named properly.

`@eslint-plugin-react-hooks`

- Checks that you've included all the necessary dependencies when you use Hooks like useEffect or useCallback.
- Ensures that Hooks are at the top level of the function component, not inside loops, conditions, or nested functions.

`@eslint-plugin-react-refresh`

- Allows you to see changes instantly during development.
Provides instant updates.

`@vite`

- Vite is a development build tool that provides an instant server start, allowing for fast project refreshes.
- With Fast Hot Module Replacement, it allows you to see changes instantly in the browser as you edit your code.
- Updates only the specific module that was changed, rather than reloading the entire page.

`@nodemon`

- Automatically restarts Node.js application when it detect file changes.
- Eliminate the needs to manually stop and restart the server during development.

# What React Context are useful for and when to use it

* React Context is useful for storing all the data, props and share state globally across multiiple components.
* Eliminates prop drilling (manually pass props through every component).

### Example when NOT using React Context:
<img width="802" alt="Screenshot 2024-10-06 at 11 22 03 AM" src="https://github.com/user-attachments/assets/5d9c278b-3d11-4ee7-aa1d-bd0f22ce2524">

In the above image, `currentPage`, `setCurrentPage`,and `paginate` were passed as props between components (prop drilling).

* This makes it hard to manage and it's prone to human error since you're manually changing the props in every component file.

### Example when Using React Context

#### PaginateProvider.jsx
<img width="305" alt="Screenshot 2024-10-06 at 11 37 42 AM" src="https://github.com/user-attachments/assets/b3932d70-55f3-41f9-b7c7-72cbd1047b42">

* `createContext()` function is used to create the `PaginationContext`.
* It allows components to access shared state (`currentPage` and `setCurrentPage`).
* `PaginationProvider`: A context provider component that wraps its child components (`paginate`).

### Purpose:
* Manages paginate state (`currentPage` and `setCurrentPage`).
* Makes this state accessible to any component within `PaginateProvider`.
* Child components can use `useContext(PaginateContext)` to access and modify `currentPage` directly.

# What Does the `usePaginationContext` Custom React Hook Does?

```javascript
import { useContext } from 'react';
import { PaginationContext } from './PaginationProvider';

export const usePaginationContext = () => useContext(PaginationContext);
```

* The hook retrieves the data from `PaginationContext`.
> data includes `currentPage` (page number) and `setcurrentPage` (function to update the page)
* `usePaginationContext` wraps `useContext(PaginationContext)` to provide an easy and reusable way to access the `PaginationContext` in any component that needs it.

# What is `useContext`?

* Allows component to consume the data from a context.
* Retrieves the data provided by a context's `Provider`, allowing you to access the context without needing to pass props through component trees.

# Two Methods of Debugging Tests 
## 1. Call the `debug()` method
* `debug()` logs the current HTML structure of the rendered component's DOM to the console.
* It helps you inspect the elements, attributes, and content currently rendered in the DOM.

#### Example:
<img width="565" alt="Screenshot 2024-10-29 at 2 49 18 AM" src="https://github.com/user-attachments/assets/0091592e-cec2-4a09-9ac2-cdc5405fe12f">

## 2. Use `screen.logTestingPlaygroundURL()`

This function logs and returns a URL to the [Testing Playground](https://testing-playground.com/)
website, which provides a visual representation of the current DOM.
* Call `screen.logTestingPlaygroundURL()` within your test at the point where you want to inspect the DOM.
* When the test runs, it prints a URL in your terminal that links to Testing Playground, allowing you to see the DOM structure visually.
* Provides suggestions for the most efficient and reliable queries to target specific elements in your tests, helping you select elements based on accessibility best practices.