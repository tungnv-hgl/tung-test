import { test, expect } from '@playwright/test';

test('Verify user cannot register without filling required fields', async ({ page }) => {
  // Step 1: Navigate to the registration page
  await page.goto('https://pl.shadeofhue.com/register');
  // Expected: Registration page loads
  await expect(page).toHaveURL('https://pl.shadeofhue.com/register');

  // Step 2: Leave required fields empty
  // Assuming the required fields have specific selectors
  const usernameInput = page.locator('input[name="username"]');
  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');

  await usernameInput.fill('');
  await emailInput.fill('');
  await passwordInput.fill('');

  // Step 3: Submit registration form
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();

  // Expected: Registration fails
  // Check for error message
  const errorMessage = page.locator('.error-message'); // Adjust selector based on actual implementation
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/missing required fields/i);
});