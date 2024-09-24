import { useSearchParams } from 'react-router-dom';
import { MovieCard } from './MovieCard';
import { Header } from './Header';
import { Pagination } from './Pagination';
import { usePaginationContext } from '../context/usePaginationContext';

export const SearchPage = ({
    moviesPerPage = 20,
    // paginate,
    // currentPage,
    currentMovies,
    totalResults,
    totalPages,
    handleSearch
    // setCurrentPage
}) => {
    const [searchParams] = useSearchParams();
    console.log(searchParams.get('movie'));

    const { currentPage, setCurrentPage } = usePaginationContext();

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
                        Displaying {totalResults} Results for "
                        {searchParams.get('movie')}"
                    </h2>

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
                    <div>
                        <Pagination
                            moviesPerPage={moviesPerPage}
                            totalMovies={totalResults}
                            // paginate={paginate}
                            // currentPage={currentPage}
                            // setCurrentPage={setCurrentPage}
                        />
                    </div>
                </section>
            </main>
        </>
    );
};
