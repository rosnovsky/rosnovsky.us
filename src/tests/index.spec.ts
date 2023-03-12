import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Rosnovksy Park™");
});

test('blog page has correct title', async ({ page }) => {
  await page.goto("/blog");

  await expect(page).toHaveTitle("Blog | Rosnovksy Park™");
})
