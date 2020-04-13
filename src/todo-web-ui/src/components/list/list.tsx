import { FunctionalComponent, h } from '@stencil/core';

export interface ListProps {
  items: any[];
}

export const List: FunctionalComponent<ListProps> = ({ items }) => (
  <ul class="list-group">
    {items.map(item => (
      <li class="list-group-item">{item}</li>
    ))}
  </ul>
);
