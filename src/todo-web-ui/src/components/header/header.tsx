import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'header.scss',
  shadow: true,
})
export class Header {
  render() {
    return (
      <nav class="navbar navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#">
            Todo
          </a>
        </div>
      </nav>
    );
  }
}
