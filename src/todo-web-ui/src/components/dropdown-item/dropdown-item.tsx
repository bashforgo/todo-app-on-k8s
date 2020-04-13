import { Component, Element, Event, EventEmitter, h } from '@stencil/core';
import { Bind } from '../../utils';

@Component({
  tag: 'app-dropdown-item',
  styleUrl: 'dropdown-item.scss',
  shadow: true,
})
export class DropdownItem {
  @Element() el!: HTMLElement;

  @Event() appClick!: EventEmitter;

  @Bind()
  onClick(event: Event) {
    this.el.dispatchEvent(
      new CustomEvent('app-dropdown:onToggle', { bubbles: true }),
    );
    this.appClick.emit(event);
  }

  render() {
    return (
      <button class="dropdown-item" onClick={this.onClick}>
        <slot />
      </button>
    );
  }
}
