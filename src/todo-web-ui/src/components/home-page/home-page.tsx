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
        <section class="row justify-content-center pt-5">
          <div class="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
            <app-home />
          </div>
        </section>
      </div>
    );
  }
}
