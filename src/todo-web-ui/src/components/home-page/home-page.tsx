import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home-page',
  styleUrl: 'home-page.scss',
  shadow: true,
})
export class HomePage {
  render() {
    return (
      <div class="container pt-5">
        <app-home />
      </div>
    );
  }
}
