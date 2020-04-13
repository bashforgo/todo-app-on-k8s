import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-card',
  styleUrl: 'card.scss',
  shadow: true,
})
export class Card {
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <slot name="title" />
          </h5>
          <slot />
        </div>
      </div>
    );
  }
}
