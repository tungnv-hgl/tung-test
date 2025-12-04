import { test, expect } from '@playwright/test';

test('Verify registration with validation messages', async ({ page }) => {
  // Step 1: Navigate to registration page
  await page.goto('https://pl.shadeofhue.com/register');
  await expect(page).toHaveTitle(/Register/); // Verify registration page loads

  // Step 2: Input invalid data
  await page.fill('input[name="username"]', ''); // Invalid username
  await page.fill('input[name="email"]', 'invalid-email'); // Invalid email
  await page.fill('input[name="password"]', '123'); // Invalid password
  await page.fill('input[name="confirmPassword"]', '1234'); // Passwords do not match

  // Step 3: Submit registration form
  await page.click('button[type="submit"]');
  await expect(page.locator('.error-message')).toBeVisible(); // Verify registration fails

  // Step 4: Check for validation messages
  await expect(page.locator('text=Username is required')).toBeVisible();
  await expect(page.locator('text=Email is invalid')).toBeVisible();
  await expect(page.locator('text=Password must be at least 6 characters')).toBeVisible();
  await expect(page.locator('text=Passwords do not match')).toBeVisible();

  // Step 5: Correct invalid data
  await page.fill('input[name="username"]', 'validUser');
  await page.fill('input[name="email"]', 'valid@example.com');
  await page.fill('input[name="password"]', 'validPassword');
  await page.fill('input[name="confirmPassword"]', 'validPassword');

  // Step 6: Submit registration form again
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/welcome/); // Verify registration is successful
  await expect(page.locator('text=Registration successful')).toBeVisible(); // Verify success message
});