document.getElementById('modeToggle').addEventListener('change', function() {
    const logo = document.getElementById('logo');
    if (this.checked) {
        document.body.classList.add('theme--dark');
        document.body.classList.remove('theme--light');
        logo.src = 'images/movie-vault-logo-white.svg'; // Path to the white logo
    } else {
        document.body.classList.add('theme--light');
        document.body.classList.remove('theme--dark');
        logo.src = 'images/movie-vault-logo.svg'; // Path to the black logo
    }
});