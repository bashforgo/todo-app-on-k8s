import { AuthGuard } from './auth-guard';

describe('app-auth-guard', () => {
  it('builds', () => {
    expect(new AuthGuard()).toBeTruthy();
  });
});
