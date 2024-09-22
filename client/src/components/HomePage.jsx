import { Header } from './Header';
import { MovieCard } from './MovieCard';
import { Pagination } from './Pagination';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

const popularMovies = currentPage => {
    console.log('popularMovies function called with currentPage:', currentPage);
    return (
        fetch(`/api?page=${currentPage}`)
            // .then(response => response.json())
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                // const responseText = await response.text();
                // throw new Error(responseText);
                throw new Error('Throwing new Error');
            })

        // .then(data => setMovies(data.results || []))
        // .catch(error => console.error('Error fetching movies:', error))
    );
};
export const HomePage = ({
    moviesPerPage,
    paginate,
    currentPage,
    handleSearch,
    setCurrentPage,
    totalResults,
    totalPages
}) => {
    console.log('HomePage component rendered');
    const { isLoading, isError, data, error, isFetching } = useQuery({
        queryKey: ['popularMovies', currentPage],
        queryFn: () => popularMovies(currentPage, moviesPerPage),
        keepPreviousData: true
    });
    // console.log(data);
    // console.log(error);
    // console.log('Show data:', data.total_results);

    console.log('I am here with the data', data);

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
                    aria-labelledby="featured-movies-title"
                >
                    <h2 className="movies__title">Featured movies</h2>
                    {isError && <div>Opps Error! {error.message}</div>}
                    {isLoading && <div>Loading...</div>}
                    {data && data.results && (
                        <>
                            <div className="movies__grid">
                                {data.results.map(movie => (
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
                                    totalMovies={20}
                                    paginate={paginate}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    // totalPages={data?.total_page || 1}
                                    setCurrentPage={setCurrentPage}
                                />
                            </div>
                        </>
                    )}
                </section>
            </main>
        </>
    );
};
