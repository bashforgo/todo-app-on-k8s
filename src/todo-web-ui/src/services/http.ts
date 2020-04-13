const BASE_URL = '/api/v1';

type SafeResponse = Response | { ok: false };

class HttpServiceImpl {
  public request(
    url: string,
    {
      headers: headersInit,
      method = 'GET',
      credentials = 'same-origin',
      ...options
    }: RequestInit = {},
  ): Promise<SafeResponse> {
    const headers = new Headers(headersInit);
    headers.append('Content-Type', 'application/json');

    return fetch(`${BASE_URL}/${url}`, {
      headers,
      method,
      credentials,
      ...options,
    }).catch(() => ({ ok: false }));
  }

  public get(url: string, options?: RequestInit): Promise<SafeResponse> {
    return this.request(url, { method: 'GET', ...options });
  }

  public post(url: string, options?: RequestInit): Promise<SafeResponse> {
    return this.request(url, { method: 'POST', ...options });
  }

  public delete(url: string, options?: RequestInit): Promise<SafeResponse> {
    return this.request(url, { method: 'DELETE', ...options });
  }
}

export const HttpService = new HttpServiceImpl();
