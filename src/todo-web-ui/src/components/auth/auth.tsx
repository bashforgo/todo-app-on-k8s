import { Component, h, State } from '@stencil/core';
import { AuthService } from '../../services';
import { noop } from '../../utils';

@Component({
  tag: 'app-auth',
  styleUrl: 'auth.scss',
  shadow: true,
})
export class Auth {
  @State() username = '';
  @State() password = '';

  @State() error = false;

  onUsernameChange = (event: Event): void => {
    if (event.target) {
      const input = event.target as HTMLInputElement;
      this.username = input.value;
    }
  };

  onPasswordChange = (event: Event): void => {
    if (event.target) {
      const input = event.target as HTMLInputElement;
      this.password = input.value;
    }
  };

  onSubmit = async (event: Event): Promise<void> => {
    event.preventDefault();

    const { username, password } = this;
    const user = await AuthService.login({ username, password }).catch(noop);

    this.error = !user;
  };

  render() {
    return (
      <app-card>
        <span slot="title">Log in</span>
        <form
          class={this.error ? 'is-invalid' : undefined}
          onSubmit={this.onSubmit}
        >
          <div class="form-group">
            <label htmlFor="app-auth-username">Username</label>
            <input
              type="text"
              class="form-control"
              id="app-auth-username"
              value={this.username}
              onInput={this.onUsernameChange}
            />
          </div>
          <div class="form-group">
            <label htmlFor="app-auth-password">Password</label>
            <input
              type="password"
              class="form-control"
              id="app-auth-password"
              value={this.password}
              onInput={this.onPasswordChange}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
        {this.error && <span class="invalid-feedback">Couldn't login</span>}
      </app-card>
    );
  }
}
