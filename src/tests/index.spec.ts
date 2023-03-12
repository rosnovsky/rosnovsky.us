import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("My personal website.");
});

test('blog page has correct title', async ({ page }) => {
  await page.goto("/blog");

  await expect(page).toHaveTitle("Blog | My personal website.");
})
