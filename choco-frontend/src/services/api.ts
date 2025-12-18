const API_BASE_URL = 'http://localhost:8080';

// Auth API
export const authAPI = {
  register: (userData: { email: string; password: string; fullName: string }) =>
    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }).then(res => res.json()),

  login: (credentials: { email: string; password: string }) =>
    fetch(`${API_BASE_URL}/auth/login`, {  // You'll need to create this endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then(res => res.json()),
};

// Products API
export const productAPI = {
  getAll: () =>
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => data.products || []),

  getById: (id: number) =>
    fetch(`${API_BASE_URL}/products/${id}`)
      .then(res => res.json()),

  create: (productData: any) =>
    fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    }).then(res => res.json()),

  update: (id: number, productData: any) =>
    fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    }).then(res => res.json()),

  delete: (id: number) =>
    fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    }),
};