import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-register-page',
  styleUrl: 'register-page.scss',
  shadow: true,
})
export class RegisterPage {
  render() {
    return (
      <div class="container pt-5">
        <section class="row justify-content-center pt-5">
          <div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <app-register />
          </div>
        </section>
      </div>
    );
  }
}
