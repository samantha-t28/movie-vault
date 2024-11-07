import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
});

test('should display the Moon icon and apply dark theme when switched to dark mode', async ({
    page
}) => {
    await page.getByRole('img', { name: 'Moon icon' }).click();
    await expect(page.locator('body')).toHaveClass(/theme--dark/);
});

test('should display the Sun icon and apply dark theme when switched to dark mode', async ({
    page
}) => {
    await expect(page.getByRole('img', { name: 'Sun icon' })).toBeVisible();
    await expect(page.locator('body')).toHaveClass(/theme--light/);
});
