import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'home.scss',
  shadow: true,
})
export class Home {
  render() {
    return <app-todo-list />;
  }
}
