export const Pagination = ({
	moviesPerPage,
	totalMovies,
	paginate,
	currentPage
}) => {
	// Hold the numbers of each page
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
		pageNumbers.push(i);
	}
	// Checks if current page is greater than 1.
	// If true, call the paginate function with current page minus 1
	const handlePrevClick = () => {
		if (currentPage > 1) {
			paginate(currentPage - 1);
		}
	};
	// Checks if current page number is less than the total number of pages.
	// If true, calls the paginate function with the current page # plus 1. Move to next page
	const handleNextClick = () => {
		if (currentPage < pageNumbers.length) {
			paginate(currentPage + 1);
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
					{/** If current page is 1, the button is disabled to prevent going to non-existent previous page */}
					<button
						onClick={handlePrevClick}
						className="page-link"
						disabled={currentPage === 1}
					>
						<i className="fa-solid fa-arrow-left"></i>
					</button>
				</li>
				{/* iterates over the pageNumbers array and creates a button for each page number */}
				{/** <li> element received 'active' class if it matches the 'currentPage' */}
				{pageNumbers.map(number => (
					<li
						key={number}
						className={`page-item ${
							currentPage === number ? 'active' : ''
						}`}
					>
						<button
							onClick={() => paginate(number)}
							className="page-link"
						>
							{number}
						</button>
					</li>
				))}
				{/** <li> element checks if current page is the last page. If true, add 'disabled' class */}
				<li
					className={`page-item ${
						currentPage === pageNumbers.length ? 'disabled' : ''
					}`}
				>
					{/** If current page is the last page, disable button */}
					<button
						onClick={handleNextClick}
						className="page-link"
						disabled={currentPage === pageNumbers.length}
					>
						<i className="fa-solid fa-arrow-right"></i>
					</button>
				</li>
			</ul>
		</nav>
	);
};
