import { Component, h, State } from '@stencil/core';
import { IUser } from '../../models';
import { AuthService } from '../../services';
import { noop, Subscribe } from '../../utils';

@Component({
  tag: 'app-header',
  styleUrl: 'header.scss',
  shadow: true,
})
export class Header {
  @State() @Subscribe(AuthService.user) user: IUser | null = null;

  logout() {
    AuthService.logout().catch(noop);
  }

  authenticated(user: IUser) {
    return (
      <ul class="navbar-nav">
        <li class="nav-item">
          <app-dropdown class="nav-link btn">
            <span slot="toggle">{user.name}</span>
            <app-dropdown-item onAppClick={this.logout}>
              Log out
            </app-dropdown-item>
          </app-dropdown>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <nav class="navbar navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#">
            Todo
          </a>

          {this.user && this.authenticated(this.user)}
        </div>
      </nav>
    );
  }
}
