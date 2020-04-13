import { ComponentDidUnload, ComponentWillLoad } from '@stencil/core';
import { Observable, Subscription } from 'rxjs';

type ComponentPrototype = Partial<ComponentWillLoad> &
  Partial<ComponentDidUnload>;

export function Subscribe<O extends Observable<T>, T>(
  observable: O,
): PropertyDecorator {
  return <K extends string | symbol>(
    target: ComponentPrototype,
    propertyKey: K,
  ): void => {
    const { componentWillLoad, componentDidUnload } = target;

    let subscription: Subscription;

    target.componentWillLoad = function (this: { [k in K]: T }) {
      subscription = observable.subscribe((value: T) => {
        this[propertyKey] = value;
      });

      if (componentWillLoad) {
        return componentWillLoad();
      }
    };

    target.componentDidUnload = function () {
      if (subscription) {
        subscription.unsubscribe();
      }

      if (componentDidUnload) {
        componentDidUnload();
      }
    };
  };
}
