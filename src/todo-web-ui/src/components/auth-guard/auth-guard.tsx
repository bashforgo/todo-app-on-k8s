import { Component, Prop, State } from '@stencil/core';
import { ComponentWillLoad } from '@stencil/router/dist/types/stencil.core';
import { User } from '../../models';
import { AuthService } from '../../services';
import { Subscribe } from '../../utils';

@Component({
  tag: 'app-auth-guard',
  shadow: true,
})
export class AuthGuard implements ComponentWillLoad {
  @Prop() authenticated!: (user: User) => any;
  @Prop() unauthenticated!: () => any;

  @State() @Subscribe(AuthService.user) user: User | null = null;

  async componentWillLoad(): Promise<void> {
    await AuthService.initialCheck;
  }

  render() {
    return this.user ? this.authenticated(this.user) : this.unauthenticated();
  }
}
