import { newE2EPage } from '@stencil/core/testing';

describe('app-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-icon></app-icon>');

    const element = await page.find('app-icon');
    expect(element).toHaveClass('hydrated');
  });
});
