import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // navigate to the home page before each test
  await page.goto('https://www.serebii.net/');
});

test.describe('Serebii Example Tests', () => {
  test('navigate to Gen VIII  main page', async ({ page }) => {
    // find and click the Gen VIII main page link (using text locator)
    await page.locator('text=Gen VIII').click();
    // find and click the link for Pokemon listing (using xpath locator)
    await page.locator('//html/body/div/div[2]/main/p[5]/a[1]').click();
    // expect that the title of the page is "Pokémon - Generation VIII Pokémon"
    await expect(page.locator('title')).toHaveText('Pokémon - Generation VIII Pokémon');
  })

  test('screenshot of POTW', async ({ page }) => {
    // find and click the first image in the right sidebar (POTW image)
    await page.locator('.tbarpic').first().click()
    // take a full page screenshot of the current POTW
    await page.screenshot({ path: 'potw.png', fullPage: true });
    // assert that we are on the POTW page
    await expect(page.locator('title')).toContainText('Pokémon of the Week');
  })
})
