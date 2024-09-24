import { useContext } from 'react';
import { PaginationContext } from './PaginationProvider';

export const usePaginationContext = () => useContext(PaginationContext);
