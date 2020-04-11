import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../models';
import { HttpService } from './http';

const IDENTITY_URL = 'identity';

class AuthServiceImpl {
  private _user = new BehaviorSubject<User | null>(null);
  public user = this._user.asObservable();

  initialCheck = this.check();

  async check(): Promise<User | null> {
    const response = await HttpService.get(IDENTITY_URL);

    const result = this.user.pipe(first()).toPromise();

    if (response.ok) {
      const user: User = await response.json();
      this._user.next(user);
    } else {
      this._user.next(null);
    }

    return result;
  }

  async login(credentials: {
    username: string;
    password: string;
  }): Promise<User | null> {
    const response = await HttpService.post(IDENTITY_URL, {
      body: JSON.stringify(credentials),
    });

    const result = this.user.pipe(first()).toPromise();

    if (response.ok) {
      const user: User = await response.json();
      this._user.next(user);
    } else {
      this._user.next(null);
    }

    return result;
  }
}

export const AuthService = new AuthServiceImpl();
