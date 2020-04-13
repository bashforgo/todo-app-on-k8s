import { Component, Element, h, Listen, Prop, State } from '@stencil/core';
import classNames from 'classnames';
import { Bind } from '../../utils';

@Component({
  tag: 'app-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true,
})
export class Dropdown {
  @Element() el!: HTMLElement;

  @Prop() class?: string;

  @State() show = false;

  @Listen('app-dropdown:onToggle')
  @Bind()
  onToggle() {
    this.show = !this.show;
  }

  @Listen('click', { target: 'document', capture: true })
  onClickOutside(event: Event) {
    if (!this.show) return;

    const path = event.composedPath();
    if (path.indexOf(this.el) < 0) {
      this.show = false;
    }
  }

  render() {
    return (
      <li class={classNames('dropdown', this.class, { show: this.show })}>
        <a class="dropdown-toggle" onClick={this.onToggle}>
          <slot name="toggle" />
        </a>
        <div
          class={classNames('dropdown-menu', 'dropdown-menu-right', {
            show: this.show,
          })}
        >
          <slot />
        </div>
      </li>
    );
  }
}
