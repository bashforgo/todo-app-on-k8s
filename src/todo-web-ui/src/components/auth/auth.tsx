import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-auth',
  styleUrl: 'auth.scss',
  shadow: true,
})
export class Auth {
  render() {
    return (
      <section class="d-flex flex-column align-items-center pt-5">
        <div class="card w-50">
          <div class="card-body">
            <h5 class="card-title">Login</h5>
            <form>
              <div class="form-group">
                <label htmlFor="app-auth-username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="app-auth-username"
                />
              </div>
              <div class="form-group">
                <label htmlFor="app-auth-password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="app-auth-password"
                />
              </div>
              <button type="button" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
