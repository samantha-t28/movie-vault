import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
});

test('should display 8 movie cards on the first page', async ({ page }) => {
    const movieCards = page.locator('.movie-card');
    await expect(movieCards).toHaveCount(8);
});

test('should display 4 movie cards on the last page', async ({ page }) => {
    const movieCards = page.locator('.movie-card');

    await page.getByRole('button', { name: '3' }).click();
    await expect(movieCards).toHaveCount(4);
});

test('should return to homepage and show first featured movies from last page', async ({
    page
}) => {
    await page.getByRole('link', { name: 'Movie Vault logo' }).click();
    await expect.toHaveURL('https://localhost:5173');

    const movieCards = page.locator('.movie-card');
    await expect(movieCards).toHaveCount(8);
});
