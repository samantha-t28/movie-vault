import { test, expect } from '@playwright/test';

test('should apply dark mode when theme is switched', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('img', { name: 'Moon icon' }).click();
    await expect(page.locator('body')).toHaveClass(/theme--dark/);
});
