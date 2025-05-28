import { usePaginationContext } from '../context/usePaginationContext';

export const Pagination = ({ moviesPerPage, totalMovies }) => {
    // console.log('Total Page Count:', totalPageCount);

    const { currentPage, setCurrentPage } = usePaginationContext();
    // Calculate how many pages is needed
    const totalPages = Math.ceil(totalMovies / moviesPerPage);
    // Hold the numbers of each page
    const pageNumbers = [];

    // Show only first 6 pages
    const maxVisiblePages = 6;

    // Only show page numbers up to the smaller of totalPages or maxVisiblePages
    for (let i = 1; i <= Math.min(totalPages, maxVisiblePages); i++) {
        pageNumbers.push(i);
    }

    // for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    //     pageNumbers.push(i);
    // }
    // pageNumbers.pop();
    // Checks if current page is greater than 1.
    // If true, call the paginate function with current page minus 1
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
                {pageNumbers.map(number => (
                    <li
                        key={number}
                        className={`page-item ${
                            currentPage === number ? 'active' : ''
                        }`}
                    >
                        <button
                            onClick={() => setCurrentPage(number)}
                            className="page-link"
                        >
                            {number}
                        </button>
                    </li>
                ))}
                {/** Render ellipsis */}
                {totalPages > maxVisiblePages && (
                    <li className="page-item">
                        <span className="page-link" aria-hidden="true">
                            ...
                        </span>
                    </li>
                )}
                {/** Render last page */}
                {totalPages > maxVisiblePages && (
                    <li
                        className={`page-item ${
                            currentPage === totalPages ? 'active' : ''
                        }`}
                    >
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="page-link"
                        >
                            {totalPages}
                        </button>
                    </li>
                )}
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
