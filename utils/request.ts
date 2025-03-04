import Swal from 'sweetalert2';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  timeout?: number;
  showError?: boolean;
  query?: Record<string, any>;
  body?: any;
};
interface ApiError {
  status?: number;
  message: string;
  data?: any;
};

async function _fetchData<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { public: { apiBaseUrl } } = useRuntimeConfig() as { public: { apiBaseUrl: string } };
  const token = localStorage.getItem('token');

  try {
    const { method = 'GET', headers = {}, timeout = 30000, showError = true, query = {}, body, ...rest } = options;
    const authHeaders = token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
    const res = await $fetch.raw<T>(url, {
      method,
      baseURL: apiBaseUrl,
      headers,
      timeout,
      query,
      body,
      ...rest,
    });

    return res._data as T;
  } catch (error: any) {
    // 處理 401 / 403 錯誤（未授權）
    if (error.response?.status === 401 || error.response?.status === 403) {
      // 清除本地存儲的登入資訊
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // 導向登入頁
      const router = useRouter();
      router.push('/login');
    };

    const apiError: ApiError = {
      status: error.response?.status,
      message: error.message || '發生錯誤',
      data: error.response?._data
    };
    // 處理基本全局錯誤
    if (options.showError) {
      Swal.fire({
        icon: error.response?.status === 404 ? 'warning' : 'error',
        title: apiError.message,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        heightAuto: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
    }
    throw apiError;
  }
}

export function fetchData(url: string, options: FetchOptions = {}): Promise<any> {
  return _fetchData(url, options);
}