import { useContext } from 'react';
import ThemeContext from './ThemeContext';

// Custom hook for accessing the ThemeContext
export const useTheme = () => useContext(ThemeContext);
