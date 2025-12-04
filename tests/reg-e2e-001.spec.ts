import { test, expect } from '@playwright/test';

test('Verify the complete registration flow', async ({ page }) => {
  // Step 1: Navigate to the registration page
  await page.goto('https://pl.shadeofhue.com/register');
  await expect(page).toHaveURL('https://pl.shadeofhue.com/register');
  
  // Step 2: Input valid registration information
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="email"]', 'testuser@example.com');
  await page.fill('input[name="password"]', 'SecurePassword123');
  await page.fill('input[name="confirmPassword"]', 'SecurePassword123');
  
  // Step 3: Submit registration form
  await page.click('button[type="submit"]');
  
  // Step 4: Check user dashboard
  await expect(page).toHaveURL(/.*dashboard/);
  
  // Step 5: Verify user account creation
  const welcomeMessage = await page.locator('text=Welcome, testuser!');
  await expect(welcomeMessage).toBeVisible();
});