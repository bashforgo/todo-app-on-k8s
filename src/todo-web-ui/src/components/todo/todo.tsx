import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { ITodo } from '../../models';
import { Bind, newId } from '../../utils';

@Component({
  tag: 'app-todo',
  styleUrl: 'todo.scss',
  shadow: true,
})
export class Todo {
  @Prop() todo!: ITodo;

  @Event() appTodoToggle!: EventEmitter<ITodo>;
  @Event() appTodoDelete!: EventEmitter<ITodo>;

  id = newId('todo');

  @Bind()
  onToggle() {
    this.appTodoToggle.emit(this.todo);
  }

  @Bind()
  onDelete() {
    this.appTodoDelete.emit(this.todo);
  }

  render() {
    return (
      <div class="row">
        <div class="col d-flex align-items-center">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              checked={this.todo.complete}
              value={undefined}
              id={this.id}
              onChange={this.onToggle}
            />
            <label
              htmlFor={this.id}
              class={classNames('form-check-label', {
                'text-muted': this.todo.complete,
              })}
            >
              {this.todo.title}
            </label>
          </div>
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-danger btn-sm"
            onClick={this.onDelete}
          >
            <app-icon icon="trash" />
          </button>
        </div>
      </div>
    );
  }
}
