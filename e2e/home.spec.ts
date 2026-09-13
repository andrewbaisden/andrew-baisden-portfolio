import { expect, type Page, test } from '@playwright/test';

async function openHome(page: Page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('group', { name: 'Hero scene' })).toHaveAttribute(
    'data-prefs-ready',
    'true',
  );
}

test.describe('home', () => {
  test('loads the hero and contact section', async ({ page }) => {
    await openHome(page);

    await expect(page.locator('#contact')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /let's build something/i }),
    ).toBeVisible();
  });

  test('theme toggle flips data-theme', async ({ page }) => {
    await openHome(page);

    const root = page.locator('html');
    await expect(root).toHaveAttribute('data-theme', 'light');

    await page
      .locator('.header-desktop')
      .getByRole('button', { name: 'Change to dark mode' })
      .click();
    await expect(root).toHaveAttribute('data-theme', 'dark');
  });

  test('scene control can switch an enabled scene', async ({ page }) => {
    await openHome(page);

    await page.getByRole('button', { name: 'Beach scene' }).click();
    await expect(page.locator('html')).toHaveAttribute(
      'data-hero-scene',
      'beach',
    );
    await expect(
      page.getByRole('button', { name: 'Beach scene' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  test('contact form validates on the client without calling Resend', async ({
    page,
  }) => {
    let contactCalls = 0;
    await page.route('**/.netlify/functions/contact', async (route) => {
      contactCalls += 1;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await openHome(page);
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.getByLabel('Name')).toBeVisible();
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText('Please enter your name')).toBeVisible();
    expect(contactCalls).toBe(0);
  });
});
