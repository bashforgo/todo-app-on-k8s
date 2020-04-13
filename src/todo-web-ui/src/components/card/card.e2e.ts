import { newE2EPage } from '@stencil/core/testing';

describe('app-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-card></app-card>');

    const element = await page.find('app-card');
    expect(element).toHaveClass('hydrated');
  });
});
