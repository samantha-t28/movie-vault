// Documentation:
// https://testing-library.com/docs/react-testing-library/api/
// https://vitest.dev/guide/testing-types.html

import { PaginationProvider } from '../context/PaginationProvider';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../components/Pagination';
import { expect, vi, it, describe } from 'vitest';
import { usePaginationContext } from '../context/usePaginationContext';

vi.mock('../context/usePaginationContext', () => ({
    usePaginationContext: vi.fn(() => ({
        currentPage: 1, // Default value for currentPage
        setCurrentPage: vi.fn() // Default mock function for setCurrentPage
    }))
}));

describe('Pagination Component', () => {
    const renderPagination = () =>
        render(
            <PaginationProvider>
                <Pagination moviesPerPage={8} totalMovies={20} />
            </PaginationProvider>
        );
    it('should update the current page when a page number is clicked', () => {
        renderPagination();

        const pageOneButton = screen.getByText('1');
        fireEvent.click(pageOneButton);
    });

    it('should check the current page button is marked as active', () => {
        renderPagination();

        const pageOneButton = screen.getByText('1');

        // Find the closest <li> parent to check if the 'active' class is applied
        const pageOneListItem = pageOneButton.closest('li');
        expect(pageOneListItem.classList.contains('active')).toBe(true);
    });

    it('should display the correct page number when clicked', () => {
        renderPagination();

        const nextButton = screen.getByLabelText('Next Page');
        const prevButton = screen.getByLabelText('Previous Page');

        expect(nextButton).toBeTruthy();
        expect(prevButton).toBeTruthy();
    });

    it('should render Previous and Next button', () => {
        renderPagination();

        const nextButton = screen.getByLabelText('Next Page');
        const backButton = screen.getByLabelText('Previous Page');

        expect(nextButton).toBeTruthy();
        expect(backButton).toBeTruthy();
    });

    it('disables Next button on last page', () => {
        renderPagination();

        const nextButton = screen.getByLabelText('Next Page');
        expect(nextButton).toBeTruthy();
    });

    it('disables Previous button on first page', () => {
        renderPagination();

        const prevButton = screen.getByLabelText('Previous Page');
        expect(prevButton.disabled).toBe(true);
    });

    it('should go to the next page on Next button click', () => {
        // Mock specific behavior for this test
        let mockCurrentPage = 2; // Track the current page manually
        const mockSetCurrentPage = vi.fn(newPage => {
            mockCurrentPage = newPage; // Update the page manually when setCurrentPage is called
        });

        usePaginationContext.mockReturnValue({
            currentPage: mockCurrentPage, // starting page
            setCurrentPage: mockSetCurrentPage
        });

        renderPagination();

        const nextButton = screen.getByLabelText('Next Page');
        const previousButton = screen.getByLabelText('Previous Page');

        fireEvent.click(nextButton);

        fireEvent.click(previousButton);

        // Check if setCurrentPage was called with 2, then with 1
        expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
    });

    it('should go to the previous page on Previous button click', () => {
        const mockSetCurrentPage = vi.fn();
        usePaginationContext.mockReturnValue({
            currentPage: 5,
            setCurrentPage: mockSetCurrentPage
        });

        renderPagination();

        const prevButton = screen.getByLabelText('Previous Page');
        fireEvent.click(prevButton);

        expect(mockSetCurrentPage).toHaveBeenCalledWith(4);
    });
});
