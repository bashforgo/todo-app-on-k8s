import { newE2EPage } from '@stencil/core/testing';

describe('app-auth-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-auth-page></app-auth-page>');

    const element = await page.find('app-auth-page');
    expect(element).toHaveClass('hydrated');
  });
});
