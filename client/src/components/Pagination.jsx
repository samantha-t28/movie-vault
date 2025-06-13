import { useState, useEffect } from 'react';
import { usePaginationContext } from '../context/usePaginationContext';

export const Pagination = ({ moviesPerPage, totalMovies }) => {
    // console.log('Total Page Count:', totalPageCount);
    console.log('--- Pagination Component is Rendering ---');
    const { currentPage, setCurrentPage } = usePaginationContext();
    // Calculate how many pages is needed
    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    // Use useState to store page number and render pages dynamically
    const [pageNumbers, setPageNumbers] = useState([]);
    useEffect(() => {
        // Case 1: Not enough pages to need complex logic (Using the for loop method)
        if (totalPages < 7) {
            const pages = []; // Create an empty array
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i); // Fill it
            }
            setPageNumbers(pages); // Set the state
            return;
        }

        // Case 2: Current page is near the beginning
        if (currentPage <= 4) {
            setPageNumbers([1, 2, 3, 4, 5, 6, '...', totalPages]);
            return;
        }

        // Case 3: Current page is near the end
        if (currentPage >= totalPages - 3) {
            setPageNumbers([
                1,
                '...',
                totalPages - 5,
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
            ]);
            return;
        }

        // Case 4: Current page is in the middle
        setPageNumbers([
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages
        ]);
    }, [currentPage, totalPages]);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    // Checks if current page number is less than the total number of pages.
    // If true, calls the paginate function with the current page # plus 1. Move to next page
    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <nav>
            <ul className="pagination">
                {/** element checks if the current page is 1. If true, it adds the 'disabled' class */}
                <li
                    className={`page-item ${
                        currentPage === 1 ? 'disabled' : ''
                    }`}
                >
                    {/** Previous Page Button */}
                    {/** If current page is 1, the button is disabled to prevent going to non-existent previous page */}
                    <button
                        aria-label="Previous Page"
                        onClick={handlePrevClick}
                        className="page-link"
                        disabled={currentPage === 1}
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                </li>
                {/** Page Button */}
                {/* iterates over the pageNumbers array and creates a button for each page number */}
                {/** <li> element received 'active' class if it matches the 'currentPage' */}
                {/** Render initial visiable pages */}
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <li
                                key={`ellipsis-${index}`}
                                className="page-item disabled"
                            >
                                <span className="page-link">...</span>
                            </li>
                        );
                    }
                    return (
                        <li
                            key={page}
                            className={`page-item ${
                                currentPage === page ? 'active' : ''
                            }`}
                        >
                            <button
                                onClick={() => setCurrentPage(page)}
                                className="page-link"
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}
                {/** <li> element checks if current page is the last page. If true, add 'disabled' class */}
                <li
                    className={`page-item ${
                        currentPage === totalPages ? 'disabled' : ''
                    }`}
                >
                    {/** Next Page Button */}
                    {/** If current page is the last page, disable button */}
                    <button
                        aria-label="Next Page"
                        onClick={handleNextClick}
                        className="page-link"
                        disabled={currentPage === totalPages}
                    >
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

// When page moves beyond page 6, shift the page numbers forward ( < 2 3 4 5 6 7 ... 10 >)
// When page 10 is selected, display previous page numbers  < 1 ... 5 6 7 8 9 10 >

// Always display up to 6 pages
// IF more than 6, display ellipsis and the last page
