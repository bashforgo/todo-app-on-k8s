import { IconDefinition, IconName } from '@fortawesome/free-solid-svg-icons';
import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { icons } from './icons';

@Component({
  tag: 'app-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon implements ComponentInterface {
  @Prop() icon!: IconName;

  render() {
    const {
      icon: [width, height, , , path],
    }: IconDefinition = icons[this.icon]!;

    return (
      <svg class="svg" viewBox={`0 0 ${width} ${height}`}>
        <path d={path as string} />
      </svg>
    );
  }
}
