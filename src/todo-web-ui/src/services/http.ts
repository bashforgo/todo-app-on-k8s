const BASE_URL = '/api/v1';

type SafeResponse = Response | { ok: false };
type RequestConfig = RequestInit & { json?: object };

class HttpServiceImpl {
  public request(
    url: string | string[],
    {
      headers: headersInit,
      method = 'GET',
      credentials = 'same-origin',
      body: bodyInit,
      json,
      ...options
    }: RequestConfig = {},
  ): Promise<SafeResponse> {
    const headers = new Headers(headersInit);
    headers.append('Content-Type', 'application/json');

    const body = bodyInit ? bodyInit : json && JSON.stringify(json);

    return fetch([BASE_URL, ...(Array.isArray(url) ? url : [url])].join('/'), {
      headers,
      method,
      credentials,
      body,
      ...options,
    }).catch(() => ({ ok: false }));
  }

  public get(
    url: string | string[],
    options?: RequestConfig,
  ): Promise<SafeResponse> {
    return this.request(url, { method: 'GET', ...options });
  }

  public post(
    url: string | string[],
    options?: RequestConfig,
  ): Promise<SafeResponse> {
    return this.request(url, { method: 'POST', ...options });
  }

  public delete(
    url: string | string[],
    options?: RequestConfig,
  ): Promise<SafeResponse> {
    return this.request(url, { method: 'DELETE', ...options });
  }

  public put(
    url: string | string[],
    options?: RequestConfig,
  ): Promise<SafeResponse> {
    return this.request(url, { method: 'PUT', ...options });
  }
}

export const HttpService = new HttpServiceImpl();
