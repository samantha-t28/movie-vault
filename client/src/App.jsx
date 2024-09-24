import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { HomePage } from './components/HomePage';
import { SearchPage } from './components/SearchPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { PaginationProvider } from './context/PaginationProvider';

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
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    const handleSearch = searchResults => {
        console.log('Search Results:', searchResults);
        setMovies(searchResults.results);
        setTotalPages(searchResults.total_pages);
        setTotalResults(searchResults.total_results);
    };

    return (
        // Provide the client to your App
        <ThemeProvider>
            <PaginationProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <HomePage
                                        movies={movies}
                                        currentMovies={movies}
                                        totalPages={totalPages}
                                        totalResults={totalResults}
                                        handleSearch={handleSearch}
                                    />
                                }
                            />
                            <Route
                                path="/search"
                                element={
                                    <SearchPage
                                        movies={movies}
                                        currentMovies={movies}
                                        totalResults={totalResults}
                                        totalPages={totalPages}
                                        handleSearch={handleSearch}
                                    />
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </QueryClientProvider>
            </PaginationProvider>
        </ThemeProvider>
    );
}

export default App;
