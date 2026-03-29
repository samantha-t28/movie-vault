import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieCard } from './MovieCard';
import { Header } from './Header';
import { Pagination } from './Pagination';
import { usePaginationContext } from '../context/usePaginationContext';

export const SearchPage = ({
    moviesPerPage = 20,
    currentMovies,
    totalResults,
    handleSearch
}) => {
    const [searchParams] = useSearchParams();
    console.log(searchParams.get('movie'));

    const searchQuery = searchParams.get('movie');
    const { currentPage, setCurrentPage } = usePaginationContext();

    useEffect(() => {
        if (searchQuery) {
            const fetchSearchResults = async () => {
                try {
                    const response = await fetch('/api', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            query: searchQuery,
                            currentPage: currentPage
                        })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        handleSearch(data);
                    }
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };
            fetchSearchResults();
        }
    }, [searchQuery, currentPage]);

    // console.log(searchResults);

    return (
        <>
            <Header
                onSearch={handleSearch}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <main className="main-content" role="main">
                <section
                    className="movies"
                    aria-labelledby="search-results-title"
                >
                    <h2 className="movies__title">
                        {totalResults > 0
                            ? `Displaying ${totalResults} Results for "
                        ${searchParams.get('movie')}"`
                            : `No results found for "${searchParams.get(
                                  'movie'
                              )}"`}
                    </h2>
                    {totalResults > 0 && (
                        <div className="movies__grid">
                            {currentMovies.map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    title={movie.title}
                                    year={movie.release_date.split('-')[0]}
                                    image={movie.poster_path}
                                    rating={movie.vote_average.toFixed(1)}
                                    genre={movie.genres.join(', ')}
                                />
                            ))}
                        </div>
                    )}
                    {totalResults > 0 && (
                        <Pagination
                            moviesPerPage={moviesPerPage}
                            totalMovies={totalResults}
                        />
                    )}
                </section>
            </main>
        </>
    );
};
