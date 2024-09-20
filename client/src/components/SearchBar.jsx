import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchBar = ({ onSearch, currentPage, setCurrentPage }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryParameter = searchParams.get('movie') || ''; // Get parameter from the URL
    const [searchQuery, setSearchQuery] = useState(searchQueryParameter);
    const navigate = useNavigate();

    // Trigger initial search when the component mounts, using the query from the URL
    useEffect(() => {
        handleSearch();
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQueryParameter]);

    const handleInputChange = event => {
        setSearchQuery(event.target.value);
        // Updates the URL's query parameters with the current search input value
        setSearchParams({ movie: event.target.value });
    };

    const handleSearch = async event => {
        // Prevent default form submission to avoid page reload
        // Added optional chaining to ensure preventDefault() is only called if 'event' is defined.
        event?.preventDefault();
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
                body: JSON.stringify({ query: searchQuery, currentPage })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            onSearch(data);
            navigate(`/search?movie=${searchQuery}`);
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
