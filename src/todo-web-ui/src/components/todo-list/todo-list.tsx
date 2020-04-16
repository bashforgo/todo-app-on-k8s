import { Component, ComponentInterface, h, Host, State } from '@stencil/core';
import { ITodo } from '../../models';
import { TodoService } from '../../services/todo';
import { Bind, noop, Subscribe } from '../../utils';
import { List } from '../list/list';

@Component({
  tag: 'app-todo-list',
  styleUrl: 'todo-list.scss',
  shadow: true,
})
export class TodoList implements ComponentInterface {
  @State() @Subscribe(TodoService.todos) todos: ITodo[] | null = null;
  @State() newTodo = '';

  async componentWillLoad(): Promise<void> {
    await TodoService.list();
  }

  async onToggle(event: CustomEvent<ITodo>) {
    const todo = event.detail;
    todo.complete = !todo.complete;
    TodoService.update(todo).catch(noop);
  }

  async onDelete(event: CustomEvent<ITodo>) {
    const todo = event.detail;
    TodoService.delete(todo).catch(noop);
  }

  @Bind()
  onNewTodoChange(event: Event) {
    if (event.target) {
      const input = event.target as HTMLInputElement;
      this.newTodo = input.value;
    }
  }

  @Bind()
  async onNewTodoSubmit(event: Event) {
    event.preventDefault();

    if (!this.newTodo) {
      return;
    }

    const todo = await TodoService.new({
      title: this.newTodo.trim(),
    }).catch(noop);

    if (!todo) {
      return;
    }

    this.newTodo = '';
  }

  hasCompleted(): boolean {
    return this.todos?.some(t => t.complete) ?? false;
  }

  onRemoveCompleted() {
    TodoService.deleteCompleted();
  }

  render() {
    return (
      <Host>
        {this.todos?.length ? (
          <List
            items={this.todos.map(todo => (
              <app-todo
                todo={todo}
                onAppTodoToggle={this.onToggle}
                onAppTodoDelete={this.onDelete}
              />
            ))}
          />
        ) : (
          <p>No todos</p>
        )}
        <form class="form-row mt-3" onSubmit={this.onNewTodoSubmit}>
          <div class="col">
            <input
              class="form-control"
              type="text"
              placeholder="New todo"
              value={this.newTodo}
              onInput={this.onNewTodoChange}
            />
          </div>
          <div class="col-auto">
            <button
              type="submit"
              class="btn btn-primary"
              disabled={!this.newTodo}
            >
              <app-icon icon="plus" />
            </button>
          </div>
        </form>
        <div class="row mt-3">
          <div class="col-auto ml-auto">
            <button
              type="button"
              class="btn btn-danger btn-sm"
              disabled={!this.hasCompleted()}
              onClick={this.onRemoveCompleted}
            >
              Remove completed
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
