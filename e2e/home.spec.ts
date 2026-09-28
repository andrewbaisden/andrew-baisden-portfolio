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

  test('shows the GitHub social card', async ({ page }) => {
    await openHome(page);

    await page.locator('#socialmedia').scrollIntoViewIfNeeded();
    await expect(
      page.getByRole('heading', { name: 'GitHub', exact: true }),
    ).toBeVisible();
    await expect(page.getByText('github.com/andrewbaisden')).toBeVisible();
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

  test('does not create horizontal page overflow on mobile', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openHome(page);
    await page.locator('#socialmedia').scrollIntoViewIfNeeded();

    const metrics = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
  });
});

test('support widget sends a bug report to IssueRelay', async ({ page }) => {
  // Stub the public ticket API: CI and local runs never create real tickets.
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
  };
  const submissions: Array<Record<string, unknown>> = [];
  await page.route(
    'https://issuerelay-web.vercel.app/api/v1/support/tickets**',
    async (route) => {
      if (route.request().method() === 'OPTIONS') {
        await route.fulfill({ status: 204, headers: cors });
        return;
      }
      submissions.push(route.request().postDataJSON());
      await route.fulfill({
        status: 201,
        headers: { ...cors, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketReference: 'SUP-42', status: 'received' }),
      });
    },
  );
  await openHome(page);

  await page.getByRole('button', { name: 'Open support' }).click();
  // Scope to the widget: the page's contact form also has a Message field.
  const widget = page.getByRole('dialog', { name: 'How can I help?' });
  await expect(widget).toBeVisible();
  await widget.getByRole('button', { name: /Report a bug/ }).click();
  await widget
    .getByRole('textbox', { name: 'Message' })
    .fill('The London scene stutters when switching to dark mode in Safari.');
  await widget.getByRole('button', { name: 'Send message' }).click();

  await expect(widget.getByText('Message received')).toBeVisible();
  await expect(widget.getByText('SUP-42')).toBeVisible();
  expect(submissions).toHaveLength(1);
  expect(submissions[0]).toMatchObject({
    projectKey: 'pk_NjcY2qluhQFMLa2OYhR23YCuytsIxOSx',
    category: 'bug',
    message: 'The London scene stutters when switching to dark mode in Safari.',
  });
  expect(submissions[0]).not.toHaveProperty('contact');
});
