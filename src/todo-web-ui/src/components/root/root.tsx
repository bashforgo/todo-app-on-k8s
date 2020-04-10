import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  shadow: true,
})
export class Root {
  render() {
    return (
      <stencil-router>
        <app-header />
        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route component="app-auth-page" />
        </stencil-route-switch>
      </stencil-router>
    );
  }
}
