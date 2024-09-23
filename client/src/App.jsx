import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { HomePage } from './components/HomePage';
import { SearchPage } from './components/SearchPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';

// Create a client
// Create a QueryClient with default options
// Setting `retry: false` ensures that queries won't automatically retry on failure
// This allows immediate error handling without multiple retry attempts
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

function App() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    // const movies = await getServer();

    const handleSearch = searchResults => {
        console.log('Search Results:', searchResults);
        setMovies(searchResults.results);
        setTotalPages(searchResults.total_pages);
        setTotalResults(searchResults.total_results);
        // setCurrentPage(1); // Reset to first page on new search
    };

    // // Pagination
    // const indexOfLastMovie = currentPage * moviesPerPage;
    // const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    // const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    // console.log('Movies on current page:', currentMovies.length); // Add this log to see the number of movies

    // Page change
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        // Provide the client to your App
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <HomePage
                                    movies={movies}
                                    currentMovies={movies}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    totalResults={totalResults}
                                    paginate={paginate}
                                    handleSearch={handleSearch}
                                    setCurrentPage={setCurrentPage}
                                />
                            }
                        />
                        <Route
                            path="/search"
                            element={
                                <SearchPage
                                    movies={movies}
                                    paginate={paginate}
                                    currentPage={currentPage}
                                    currentMovies={movies}
                                    totalResults={totalResults}
                                    totalPages={totalPages}
                                    handleSearch={handleSearch}
                                    setCurrentPage={setCurrentPage}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
