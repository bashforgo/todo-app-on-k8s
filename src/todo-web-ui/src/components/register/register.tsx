import { Component, h, State } from '@stencil/core';
import { AuthService } from '../../services';
import { Bind, noop } from '../../utils';

@Component({
  tag: 'app-register',
  styleUrl: 'register.scss',
  shadow: true,
})
export class Register {
  @State() username = '';

  @State() error = false;
  @State() redirect = false;

  @Bind()
  onUsernameChange(event: Event): void {
    if (event.target) {
      const input = event.target as HTMLInputElement;
      this.username = input.value;
    }
  }

  @Bind()
  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const user = await AuthService.new({ username: this.username }).catch(noop);

    if (user) {
      this.redirect = true;
    } else {
      this.error = true;
    }
  }

  render() {
    return this.redirect ? (
      <stencil-router-redirect url="/" />
    ) : (
      <app-card>
        <span slot="title">Register</span>
        <form
          class={this.error ? 'is-invalid' : undefined}
          onSubmit={this.onSubmit}
        >
          <div class="form-group">
            <label htmlFor="app-auth-username">Username</label>
            <input
              type="text"
              class="form-control"
              value={this.username}
              onInput={this.onUsernameChange}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
        {this.error && <span class="invalid-feedback">Couldn't register</span>}
      </app-card>
    );
  }
}
