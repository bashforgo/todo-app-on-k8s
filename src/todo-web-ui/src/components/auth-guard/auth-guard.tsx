import { Component, Prop, State } from '@stencil/core';
import { ComponentWillLoad } from '@stencil/router/dist/types/stencil.core';
import { IUser } from '../../models';
import { AuthService } from '../../services';
import { Subscribe } from '../../utils';

@Component({
  tag: 'app-auth-guard',
  shadow: true,
})
export class AuthGuard implements ComponentWillLoad {
  @Prop() authenticated!: (user: IUser) => any;
  @Prop() unauthenticated!: () => any;

  @State() @Subscribe(AuthService.user) user: IUser | null = null;

  async componentWillLoad(): Promise<void> {
    await AuthService.initialCheck;
  }

  render() {
    return this.user ? this.authenticated(this.user) : this.unauthenticated();
  }
}
