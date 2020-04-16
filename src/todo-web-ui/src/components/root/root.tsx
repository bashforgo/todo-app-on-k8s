import { Component, h } from '@stencil/core';
import { Bind } from '../../utils';

@Component({
  tag: 'app-root',
  shadow: true,
})
export class Root {
  authenticated() {
    return <app-home-page />;
  }
  unauthenticated() {
    return <app-auth-page />;
  }

  @Bind()
  baseRoute() {
    return (
      <app-auth-guard
        authenticated={this.authenticated}
        unauthenticated={this.unauthenticated}
      />
    );
  }

  render() {
    return (
      <stencil-router>
        <app-header />
        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route url="/" exact routeRender={this.baseRoute} />
          <stencil-route url="/register" component="app-register-page" />
        </stencil-route-switch>
      </stencil-router>
    );
  }
}
