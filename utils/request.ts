async function _fetchData<T>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    params?: Record<string, any>;
    headers?: Record<string, string>;
    timeout?: number;
    showError?: boolean;
  } = {}
): Promise<T> {
  const { public: { apiBaseUrl } } = useRuntimeConfig() as { public: { apiBaseUrl: string } };

  try {
    const { method = 'GET', params = {}, headers = {}, timeout = 30000, showError = true } = options;

    const res = await $fetch.raw<T>(url, {
      method,
      baseURL: apiBaseUrl,
      headers,
      timeout,
      ...params,
    });

    return res._data as T;
  } catch (error: any) {
    console.error('Error:', error);
    throw error;
  }
}

export function fetchData(url: string, params: Record<string, any> = {}): Promise<any> {
  return _fetchData(url, params).then((res: any) => res).catch((e: any) => { throw e });
}