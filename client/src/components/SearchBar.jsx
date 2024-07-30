import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	const handleInputChange = event => {
		setSearchQuery(event.target.value);
	};

	const handleSearch = async event => {
		// Prevent default form submission to avoid page reload
		event.preventDefault();
		if (!searchQuery.trim()) {
			return;
		}

		try {
			const response = await fetch('/api', {
				// Relative URL
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ query: searchQuery })
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			onSearch(data.results || []);
			navigate('/search');
		} catch (error) {
			console.error('Error fetching search results:', error);
		}
	};

	return (
		<form onSubmit={handleSearch} className="search-form">
			<input
				type="search"
				value={searchQuery}
				onChange={handleInputChange}
				id="searchInput"
				name="search"
				className="search-form__input"
				placeholder="Search for movies or actors"
				aria-label="Search for movies or actors"
			/>
			<button type="submit" className="search-form__button">
				<i className="fas fa-search search-icon"></i>
			</button>
		</form>
	);
};
