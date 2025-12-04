import { test, expect } from '@playwright/test';

test('Verify user cannot register with an improperly formatted email', async ({ page }) => {
  // Step 1: Navigate to registration page
  await page.goto('https://pl.shadeofhue.com/register');
  await expect(page).toHaveURL('https://pl.shadeofhue.com/register');

  // Step 2: Input invalid email format
  const emailInput = page.locator('input[name="email"]');
  await emailInput.fill('invalid-email-format');

  // Step 3: Submit registration form
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();

  // Expected Results: Error message displays for invalid email format
  const errorMessage = page.locator('.error-message'); // Adjust selector based on actual implementation
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Please enter a valid email address.'); // Adjust message based on actual implementation
});