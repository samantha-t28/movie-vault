import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByPlaceholder('Search for movies or actors').click();
    // await page.goto('http://localhost:5173/?movie=james+bon');
    await page
        .getByPlaceholder('Search for movies or actors')
        .fill('james bond');
    // await page.goto('http://localhost:5173/?movie=james+bond');
    await page.getByPlaceholder('Search for movies or actors').press('Enter');
    await expect(page.locator('h2')).toContainText(
        'Displaying 83 Results for "james bond"'
    );
});
