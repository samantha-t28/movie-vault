import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
});

test('should display search results for "James Bond"', async ({ page }) => {
    await page.getByPlaceholder('Search for movies or actors').click();
    await page
        .getByPlaceholder('Search for movies or actors')
        .fill('james bond');
    await page.getByPlaceholder('Search for movies or actors').press('Enter');
    await expect(page.locator('h2')).toContainText('Results for "james bond"');
});

test('should navigate to Home Page after clicking the logo', async ({
    page
}) => {
    await page.getByRole('link', { name: 'Movie Vault logo' }).click();
    await expect(page).toHaveURL('https://localhost:5173');
});

test('should display "No results found" message when no results are returned', async ({
    page
}) => {
    await page.getByPlaceholder('Search for movies or actors').fill('xyz123');
    await page.getByPlaceholder('Search for movies or actors').press('Enter');
    await expect(page.locator('h2')).toContainText('No results found for');
});

test('should hide pagination control when no results are found', async ({
    page
}) => {
    await page.getByPlaceholder('Search for movies or actors').fill('xyz123');
    await page.getByPlaceholder('Search for movies or actors').press('Enter');
    const pagination = page.locator('.pagination');
    await expect(pagination).toBeHidden();
});
