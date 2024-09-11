import { createContext, useState, useLayoutEffect } from 'react';

// Create the ThemeContext to hold the current theme (light or dark)
const ThemeContext = createContext();

// ThemeProvider component that wraps the app and manages the theme state
export const ThemeProvider = ({ children }) => {
	// Retrieve theme on load
	const [theme, setTheme] = useState(
		() => localStorage.getItem('theme') || 'light'
	);
	// Apply theme and save it to local storage
	useLayoutEffect(() => {
		document.body.className = `theme--${theme}`;

		// Saves 'light' or 'dark' to storage
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		// Provide the theme and toggleTheme function to the rest of the app
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContext;
