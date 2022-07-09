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

  // this test requires a different context since it involves multiple pages
  test('navigate to Forums', async ({ context }) => {
    // assign context and navigate first page to home
    const home = await context.newPage();
    await home.goto('https://serebii.net')

    // on home page, click Forums link which opens a new page
    const [forums] = await Promise.all([
      context.waitForEvent('page'),
      home.locator('text=Forums').first().click()
    ])

    // wait for new Forums page to load
    await forums.waitForLoadState();
    // assert that URL is correct for Forums page
    await expect(forums).toHaveURL('https://forums.serebii.net/');
  })

  // this test is meant to demonstrate a failure
  test('this test will fail', async ({ page }) => {
    // assert that the title is something we know it isn't to demonstrate failure
    await expect(page.locator('title')).toHaveText('I will fail');
  })
})
