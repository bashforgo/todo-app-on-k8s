const BASE_URL = '/api/v1';

class HttpServiceImpl {
  public request(
    url: string,
    {
      headers: headersInit,
      method = 'GET',
      credentials = 'same-origin',
      ...options
    }: RequestInit = {}
  ): Promise<Response> {
    const headers = new Headers(headersInit);
    headers.append('Content-Type', 'application/json');

    return fetch(`${BASE_URL}/${url}`, {
      headers,
      method,
      credentials,
      ...options,
    });
  }

  public get(url: string, options?: RequestInit): Promise<Response> {
    return this.request(url, { method: 'GET', ...options });
  }

  public post(url: string, options?: RequestInit): Promise<Response> {
    return this.request(url, { method: 'POST', ...options });
  }
}

export const HttpService = new HttpServiceImpl();
