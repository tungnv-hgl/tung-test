import { test, expect } from '@playwright/test';

test('Verify user cannot register with an email that is already in use', async ({ page }) => {
  // Step 1: Navigate to registration page
  await page.goto('https://pl.shadeofhue.com/register');
  await expect(page).toHaveTitle(/Register/); // Verify registration page loads

  // Step 2: Input an existing email and other valid details
  const existingEmail = 'existinguser@example.com'; // Replace with an actual existing email
  await page.fill('input[name="email"]', existingEmail);
  await page.fill('input[name="username"]', 'validusername'); // Replace with valid username
  await page.fill('input[name="password"]', 'ValidPassword123'); // Replace with valid password

  // Step 3: Submit registration form
  await page.click('button[type="submit"]'); // Adjust selector as needed

  // Step 4: Check for error message
  const errorMessage = await page.locator('.error-message'); // Adjust selector as needed
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Email is already in use/); // Adjust expected error message as needed
});