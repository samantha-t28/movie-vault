import { useEffect } from 'react';

export const ThemeToggle = () => {
	useEffect(() => {
		const logo = document.getElementById('logo');
		const toggleSwitch = document.getElementById('toggleSwitch');

		const handleToggleChange = () => {
			if (toggleSwitch.checked) {
				document.body.classList.add('theme--dark');
				document.body.classList.remove('theme--light');
				logo.src = '/movie-vault-logo-white.svg'; // Path to the white logo
			} else {
				document.body.classList.add('theme--light');
				document.body.classList.remove('theme--dark');
				logo.src = '/movie-vault-logo.svg'; // Path to the black logo
			}
		};
		toggleSwitch.addEventListener('change', handleToggleChange);

		// Cleanup event listener on component unmount
		return () => {
			toggleSwitch.removeEventListener('change', handleToggleChange);
		};
	}, []);

	return (
		<div className="theme-toggle">
			<input
				type="checkbox"
				id="toggleSwitch"
				className="theme-toggle__checkbox"
				aria-label="Toggle light and dark mode"
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
