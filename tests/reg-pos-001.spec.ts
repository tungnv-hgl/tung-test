import { test, expect } from '@playwright/test';

test('Verify user can register with valid details', async ({ page }) => {
  // Step 1: Navigate to the registration page
  await page.goto('https://pl.shadeofhue.com/register');
  await expect(page).toHaveURL('https://pl.shadeofhue.com/register');
  
  // Step 2: Input valid username, email, and password
  await page.fill('input[name="username"]', 'validUsername');
  await page.fill('input[name="email"]', 'valid@example.com');
  await page.fill('input[name="password"]', 'ValidPassword123');
  
  // Step 3: Submit registration form
  await page.click('button[type="submit"]');
  
  // Expected Results
  await expect(page.locator('text=Registration successful')).toBeVisible();
  await expect(page).toHaveURL('https://pl.shadeofhue.com/dashboard');
});