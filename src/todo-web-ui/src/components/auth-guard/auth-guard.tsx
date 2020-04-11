import { Component, Prop, State } from '@stencil/core';
import {
  ComponentDidUnload,
  ComponentWillLoad,
} from '@stencil/router/dist/types/stencil.core';
import { Subscription } from 'rxjs';
import { User } from '../../models';
import { AuthService } from '../../services';

@Component({
  tag: 'app-auth-guard',
  shadow: true,
})
export class AuthGuard implements ComponentWillLoad, ComponentDidUnload {
  @Prop() authenticated!: () => any;
  @Prop() unauthenticated!: () => any;

  @State() user: User | null = null;

  sub?: Subscription;

  async componentWillLoad(): Promise<void> {
    this.sub = AuthService.user.subscribe((user) => {
      this.user = user;
    });
    await AuthService.initialCheck;
  }

  componentDidUnload() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  render() {
    return this.user ? this.authenticated() : this.unauthenticated();
  }
}
