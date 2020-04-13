import { newE2EPage } from '@stencil/core/testing';

describe('app-todo-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-todo-list></app-todo-list>');

    const element = await page.find('app-todo-list');
    expect(element).toHaveClass('hydrated');
  });
});
