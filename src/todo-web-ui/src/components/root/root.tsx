import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  shadow: true,
})
export class Root {
  authenticated() {
    return <stencil-route component="app-home-page" />;
  }
  unauthenticated() {
    return <stencil-route component="app-auth-page" />;
  }

  render() {
    return (
      <stencil-router>
        <app-header />
        <stencil-route-switch scrollTopOffset={0}>
          <app-auth-guard
            authenticated={this.authenticated}
            unauthenticated={this.unauthenticated}
          />
        </stencil-route-switch>
      </stencil-router>
    );
  }
}
