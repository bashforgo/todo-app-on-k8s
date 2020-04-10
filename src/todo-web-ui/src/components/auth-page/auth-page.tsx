import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-auth-page',
  styleUrl: 'auth-page.scss',
  shadow: true,
})
export class AuthPage {
  render() {
    return (
      <div class="container pt-5">
        <app-auth />
      </div>
    );
  }
}
