import { BehaviorSubject, noop } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../models';
import { HttpService } from './http';

const IDENTITY_URL = 'identity';

class AuthServiceImpl {
  private _user = new BehaviorSubject<User | null>(null);
  public user = this._user.asObservable();

  initialCheck = this.check().catch(noop);

  async check(): Promise<User> {
    const response = await HttpService.get(IDENTITY_URL);

    if (response.ok) {
      const user: User = await response.json();
      const result = this.user.pipe(first()).toPromise();
      this._user.next(user);
      return result as Promise<User>;
    }

    this._user.next(null);
    return Promise.reject();
  }

  async login(credentials: {
    username: string;
    password: string;
  }): Promise<User> {
    const response = await HttpService.post(IDENTITY_URL, {
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const user: User = await response.json();
      const result = this.user.pipe(first()).toPromise();
      this._user.next(user);
      return result as Promise<User>;
    }

    this._user.next(null);
    return Promise.reject();
  }

  async logout(): Promise<void> {
    const response = await HttpService.delete(IDENTITY_URL);

    if (response.ok) {
      this._user.next(null);
      return;
    }

    return Promise.reject();
  }
}

export const AuthService = new AuthServiceImpl();
