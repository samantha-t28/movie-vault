// Documentation:
// https://testing-library.com/docs/react-testing-library/api/
// https://vitest.dev/guide/testing-types.html

import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../components/Pagination';
import { expect, test, vi } from 'vitest';

test('correct page number when page button is clicked', () => {
    const mockPaginate = vi.fn();

    render(
        <Pagination
            moviesPerPage={8}
            totalMovies={20}
            currentPage={2}
            paginate={mockPaginate}
        />
    );
    // Clicking on page 2 to see if paginate is called
    const pageTwo = screen.getByText('2');
    fireEvent.click(pageTwo);

    expect(mockPaginate).toHaveBeenCalledWith(2);
});

test('when Next and Back buttons are clicked', () => {
    const mockPaginate = vi.fn();

    render(
        <Pagination
            moviesPerPage={8}
            totalMovies={20}
            currentPage={2}
            paginate={mockPaginate}
        />
    );

    const nextButton = screen.getByLabelText('Next Page');
    const backButton = screen.getByLabelText('Previous Page');

    fireEvent.click(nextButton);
    expect(mockPaginate).toHaveBeenCalledWith(3);

    fireEvent.click(backButton);
    expect(mockPaginate).toHaveBeenCalledWith(1);
});

test('renders Previous and Next buttons', () => {
    render(
        <Pagination
            moviesPerPage={8}
            totalMovies={20}
            currentPage={2}
            paginate={() => {}}
        />
    );
    const nextButton = screen.getByLabelText('Next Page');
    const backButton = screen.getByLabelText('Previous Page');

    expect(nextButton).toBeTruthy();
    expect(backButton).toBeTruthy();
});

test('disables Next button on last page'),
    () => {
        render(
            <Pagination
                moviesPerPage={8}
                totalMovies={20}
                currentPage={2}
                paginate={() => {}}
            />
        );
        const nextButton = screen.getByLabelText('Next Page');
        expect(nextButton).toBeTruthy();
    };
