import { newE2EPage } from '@stencil/core/testing';

describe('app-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-dropdown></app-dropdown>');

    const element = await page.find('app-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
