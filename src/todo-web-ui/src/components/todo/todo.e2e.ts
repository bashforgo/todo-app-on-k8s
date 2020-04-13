import { newE2EPage } from '@stencil/core/testing';

describe('app-todo', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-todo></app-todo>');

    const element = await page.find('app-todo');
    expect(element).toHaveClass('hydrated');
  });
});
