import { newE2EPage } from '@stencil/core/testing';

describe('app-register-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-register-page></app-register-page>');

    const element = await page.find('app-register-page');
    expect(element).toHaveClass('hydrated');
  });
});
