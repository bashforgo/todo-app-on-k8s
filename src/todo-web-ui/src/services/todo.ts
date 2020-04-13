import { BehaviorSubject } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
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
      body: JSON.stringify(todo),
    });

    if (response.ok) {
      const fresh: ITodo = await response.json();
      this._todos
        .pipe(
          first(),
          filter((t): t is ITodo[] => Array.isArray(t)),
        )
        .subscribe(todos => {
          const next = todos.map(t => (t.id === fresh.id ? fresh : t));
          this._todos.next(next);
        });
      return fresh;
    }

    return Promise.reject();
  }

  async delete(todo: ITodo): Promise<void> {
    const response = await HttpService.delete([TODOS_URL, `${todo.id}`]);

    if (response.ok) {
      this._todos
        .pipe(
          first(),
          filter((t): t is ITodo[] => Array.isArray(t)),
        )
        .subscribe(todos => {
          const next = todos.filter(t => t.id !== todo.id);
          this._todos.next(next);
        });
      return Promise.resolve();
    }

    return Promise.reject();
  }
}

export const TodoService = new TodoServiceImpl();
