import { newE2EPage } from '@stencil/core/testing';

describe('app-dropdown-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-dropdown-item></app-dropdown-item>');

    const element = await page.find('app-dropdown-item');
    expect(element).toHaveClass('hydrated');
  });
});
