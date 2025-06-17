export interface APIResponse<T, I = undefined> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  inputData?: I;
}

export interface APIErrorResponse {
  success: boolean;
  error: string;
  data: {
    timestamp: number;
    message: string;
    details: string;
  };
}

export class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(url: string, options: RequestInit): Promise<APIResponse<T>> {
    const response = await fetch(`${this.baseUrl}${url}`, options);
    
    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      const jsonContentType = 'application/json; charset=utf-8';
      
      if (jsonContentType.includes(contentType!)) {
          // const data = await response.json();          
          // return { success: false, error: data.detail, data: data };
      } else {
          return { success: false, error: `${response.statusText}`, data: undefined };
      }
    }

    // Check if response has content to parse
    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');
    
    // If no content-type, content-length is 0, or status is 204 (No Content), don't try to parse JSON
    if (!contentType || 
        contentLength === '0' || 
        response.status === 204 ||
        !contentType.includes('application/json')) {
      return { success: true, data: undefined as T };
    }

    // Check if response body is empty
    const text = await response.text();
    if (!text || text.trim() === '') {
      return { success: true, data: undefined as T };
    }

    try {
      const data = JSON.parse(text);
      return { success: true, data }; 
    } catch (error) {
      // If JSON parsing fails, but response was successful, return success with no data
      console.warn('Failed to parse JSON response, but request was successful:', error);
      return { success: true, data: undefined as T };
    }
  }

  async get<T>(url: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    return this.request<T>(url, { method: 'GET', ...options });
  }

  async post<T>(url: string, data: unknown, options: RequestInit = {}): Promise<APIResponse<T>> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { ...(options.headers || {}) },
      ...options,
    });
  }

  async patch<T>(url: string, data: unknown, options: RequestInit = {}): Promise<APIResponse<T>> {
    return this.request<T>(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
  }

  async put<T>(url: string, data: unknown, options: RequestInit = {}): Promise<APIResponse<T>> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
  }

  async delete<T>(url: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    return this.request<T>(url, { method: 'DELETE', ...options });
  }
}

export const apiClient = new APIClient(process.env.BACKEND_BASE_URL!);