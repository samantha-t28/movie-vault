import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/useTheme';

export const Header = ({ onSearch }) => {
    const { theme } = useTheme();

    return (
        <div className="theme--light">
            <div className="header-wrapper">
                <header className="header">
                    <Link to="/">
                        <img
                            id="logo"
                            className="header__logo-img"
                            src={
                                theme === 'light'
                                    ? '/movie-vault-logo.svg'
                                    : '/movie-vault-logo-white.svg'
                            }
                            alt="Movie Vault logo"
                        />
                    </Link>
                    <div className="header__search-bar">
                        <SearchBar
                            onSearch={onSearch}
                            // currentPage={currentPage}
                            // setCurrentPage={setCurrentPage}
                        />
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
