import { Component, ComponentInterface, h, State } from '@stencil/core';
import { ITodo } from '../../models';
import { TodoService } from '../../services/todo';
import { noop, Subscribe } from '../../utils';
import { List } from '../list/list';

@Component({
  tag: 'app-todo-list',
  styleUrl: 'todo-list.scss',
  shadow: true,
})
export class TodoList implements ComponentInterface {
  @State() @Subscribe(TodoService.todos) todos: ITodo[] | null = null;

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

  render() {
    return this.todos?.length ? (
      <List
        items={this.todos.map(todo => (
          <app-todo
            key={todo.id}
            todo={todo}
            onAppTodoToggle={this.onToggle}
            onAppTodoDelete={this.onDelete}
          />
        ))}
      />
    ) : (
      <p>No todos</p>
    );
  }
}
