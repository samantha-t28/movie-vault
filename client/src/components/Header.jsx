import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';

export const Header = ({ onSearch }) => {
	return (
		<div className="theme--light">
			<div className="header-wrapper">
				<header className="header">
					<Link to="/">
						<img
							className="header__logo-img"
							src="/movie-vault-logo.svg"
							alt="Movie Vault logo"
							id="logo"
						/>
					</Link>
					<div className="header__search-bar">
						<SearchBar onSearch={onSearch} />
					</div>
					<div className="header__nav-icons">
						<i className="fas fa-heart heart-icon"></i>
						<ThemeToggle />
					</div>
					<button className="hamburger-menu">
						<i className="fas fa-bars"></i>
					</button>
				</header>
			</div>
		</div>
	);
};
