import { useContext } from 'react';
import ThemeContext from './ThemeProvider';

// Custom hook for accessing the ThemeContext
export const useTheme = () => useContext(ThemeContext);
