const API_URL = 'http://127.0.0.1:8000';

function getToken() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  return token;
}

export async function getCategory({ id = null, includeProducts = false } = {}) {
  const token = getToken();
  const queryParams = new URLSearchParams();

  if (includeProducts) queryParams.append('includeProducts', 'true');

  let url = `${API_URL}/api/v1/categories`;
  if (id) url += `/${id}`;
  if (queryParams.toString()) url += `?${queryParams.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function postCategory(categoryData) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/v1/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryData),
  });

  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}

export async function putCategory(id, categoryData) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/v1/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryData),
  });

  if (!res.ok) throw new Error('Failed to update category');
  return res.json();
}

export async function patchCategory(id, partialData) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/v1/categories/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(partialData),
  });

  if (!res.ok) throw new Error('Failed to patch category');
  return res.json();
}

export async function deleteCategory(id) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/v1/categories/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete category');
  return true;
}
