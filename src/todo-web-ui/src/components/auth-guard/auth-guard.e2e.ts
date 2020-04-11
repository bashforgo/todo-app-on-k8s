import { newE2EPage } from '@stencil/core/testing';

describe('app-auth-guard', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-auth-guard></app-auth-guard>');

    const element = await page.find('app-auth-guard');
    expect(element).toHaveClass('hydrated');
  });
});
