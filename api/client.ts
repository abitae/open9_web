import type { Project, ClientLogo, ProjectInquiry, ContactMessage } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const TOKEN_KEY = 'open9_token';

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

/** Verifica si el backend está alcanzable. Timeout 5s. */
export async function checkApiConnection(): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: 'GET',
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    clearTimeout(timeout);
    return false;
  }
}

async function request<T>(
  path: string,
  options: RequestInit & { requireAuth?: boolean } = {}
): Promise<T> {
  const { requireAuth = false, ...fetchOptions } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((fetchOptions.headers as Record<string, string>) || {}),
  };
  if (requireAuth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const url = `${API_BASE}${path}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  let res: Response;
  try {
    res = await fetch(url, { ...fetchOptions, headers, signal: controller.signal });
  } catch (err) {
    clearTimeout(timeoutId);
    const msg = err instanceof Error ? err.message : 'Error de red';
    throw new Error(
      `No se pudo conectar con el servidor (${msg}). Comprueba que el backend esté en marcha en ${API_BASE} y que no haya bloqueo por firewall o CORS.`
    );
  }
  clearTimeout(timeoutId);
  if (res.status === 401) {
    clearToken();
    throw new Error('unauthorized');
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// Public
export async function getProjects(): Promise<Project[]> {
  return request<Project[]>('/api/projects');
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  return request<ClientLogo[]>('/api/client-logos');
}

export async function postInquiry(inquiry: Omit<ProjectInquiry, 'id' | 'date'> & { date?: string }): Promise<ProjectInquiry> {
  return request<ProjectInquiry>('/api/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiry),
  });
}

export async function postContactMessage(message: Omit<ContactMessage, 'id' | 'date'> & { date?: string }): Promise<ContactMessage> {
  return request<ContactMessage>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(message),
  });
}

// Auth
export async function login(username: string, password: string): Promise<{ token: string }> {
  return request<{ token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

// Admin (require auth)
export async function getInquiries(): Promise<ProjectInquiry[]> {
  return request<ProjectInquiry[]>('/api/admin/inquiries', { requireAuth: true });
}

export async function getMessages(): Promise<ContactMessage[]> {
  return request<ContactMessage[]>('/api/admin/messages', { requireAuth: true });
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  return request<Project>('/api/admin/projects', {
    method: 'POST',
    body: JSON.stringify(project),
    requireAuth: true,
  });
}

export async function deleteProject(id: number): Promise<void> {
  return request<void>(`/api/admin/projects/${id}`, {
    method: 'DELETE',
    requireAuth: true,
  });
}

export async function createClientLogo(logo: Omit<ClientLogo, 'id'>): Promise<ClientLogo> {
  return request<ClientLogo>('/api/admin/client-logos', {
    method: 'POST',
    body: JSON.stringify(logo),
    requireAuth: true,
  });
}

export async function deleteClientLogo(id: number): Promise<void> {
  return request<void>(`/api/admin/client-logos/${id}`, {
    method: 'DELETE',
    requireAuth: true,
  });
}

export { clearToken };
