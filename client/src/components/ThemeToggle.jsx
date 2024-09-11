import { useTheme } from '../context/useTheme';

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="theme-toggle">
			<input
				type="checkbox"
				id="toggleSwitch"
				className="theme-toggle__checkbox"
				aria-label="Toggle light and dark mode"
				checked={theme === 'dark'}
				onChange={toggleTheme}
			/>
			<label htmlFor="toggleSwitch" className="theme-toggle__label">
				<span className="theme-toggle__slider">
					<img
						className="theme-toggle__icon theme-toggle__icon--sun"
						src="/sun.svg"
						alt="Sun icon"
					/>
					<img
						className="theme-toggle__icon theme-toggle__icon--moon"
						src="/moon.svg"
						alt="Moon icon"
					/>
				</span>
			</label>
		</div>
	);
};
