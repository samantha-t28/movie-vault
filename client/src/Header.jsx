import { useState } from 'react';

export const Header = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleInputChange = event => {
		setSearchQuery(event.target.value);
	};

	const handleSearch = async event => {
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
		} catch (error) {
			console.error('Error fetching search results:', error);
		}
	};

	return (
		<div className="theme--light">
			<div className="header-wrapper">
				<header className="header">
					<div className="header__logo">
						<img
							className="header__logo-img"
							src="/movie-vault-logo.svg"
							alt="Movie Vault logo"
							id="logo"
						/>
					</div>
					<div className="header__search-bar">
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
							<button
								type="submit"
								className="search-form__button"
							>
								<i className="fas fa-search search-icon"></i>
							</button>
						</form>
					</div>
					<div className="header__nav-icons">
						<i className="fas fa-heart heart-icon"></i>
						<div className="theme-toggle">
							<input
								type="checkbox"
								id="modeToggle"
								className="theme-toggle__checkbox"
								aria-label="Toggle light and dark mode"
							/>
							<label
								htmlFor="modeToggle"
								className="theme-toggle__label"
							>
								<span className="theme-toggle__slider">
									<img
										className="theme-toggle__icon theme-toggle__icon--sun"
										src="/sun.svg"
										alt="Sun icon"
									/>
									<img
										className="theme-toggle__icon theme-toggle__icon--moon"
										src="/moon.svg"
										alt="Moon icon"
									/>
								</span>
							</label>
						</div>
					</div>
					<button className="hamburger-menu">
						<i className="fas fa-bars"></i>
					</button>
				</header>
			</div>
		</div>
	);
};
