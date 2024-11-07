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
