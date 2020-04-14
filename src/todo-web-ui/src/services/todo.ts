import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITodo } from '../models';
import { HttpService } from './http';

const TODOS_URL = 'todos';

class TodoServiceImpl {
  private _todos = new BehaviorSubject<ITodo[] | null>(null);
  public todos = this._todos.pipe(map(ts => ts?.map(t => ({ ...t }))));

  async list(): Promise<ITodo[]> {
    const response = await HttpService.get(TODOS_URL);

    if (response.ok) {
      const todos: ITodo[] = await response.json();
      this._todos.next(todos);
      return todos;
    }

    return Promise.reject();
  }

  async update(todo: ITodo): Promise<ITodo> {
    const response = await HttpService.put([TODOS_URL, `${todo.id}`], {
      json: todo,
    });

    if (response.ok) {
      const fresh: ITodo = await response.json();
      const todos = this.getTodos();
      if (todos) {
        const next = todos.map(t => (t.id === fresh.id ? fresh : t));
        this._todos.next(next);
      }
      return fresh;
    }

    return Promise.reject();
  }

  async delete(todo: ITodo): Promise<void> {
    const response = await HttpService.delete([TODOS_URL, `${todo.id}`]);

    if (response.ok) {
      const todos = this.getTodos();
      if (todos) {
        const next = todos.filter(t => t.id !== todo.id);
        this._todos.next(next);
      }
      return Promise.resolve();
    }

    return Promise.reject();
  }

  async new<T extends Pick<ITodo, 'title'>>(todo: T): Promise<ITodo> {
    const response = await HttpService.post(TODOS_URL, { json: todo });

    if (response.ok) {
      const todo: ITodo = await response.json();
      const todos = this.getTodos();
      if (todos) {
        const next = todos.concat(todo);
        this._todos.next(next);
      } else {
        this._todos.next([todo]);
      }
      return todo;
    }

    return Promise.reject();
  }

  async deleteCompleted(): Promise<void> {
    const todos = this._todos.value;
    if (todos) {
      const toDelete = todos.filter(t => t.complete).map(t => this.delete(t));
      await Promise.all(toDelete);
      await this.list();
    }
  }

  private getTodos(): ITodo[] | null {
    return this._todos.value;
  }
}

export const TodoService = new TodoServiceImpl();
