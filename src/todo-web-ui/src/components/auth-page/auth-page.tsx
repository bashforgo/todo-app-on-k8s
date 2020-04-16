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
        <section class="row justify-content-center pt-5">
          <div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <app-auth />
          </div>
        </section>
        <section class="row justify-content-center pt-1">
          <div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div class="d-flex justify-content-end">
              <stencil-route-link url="/register" class="ml-auto">
                Register
              </stencil-route-link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
