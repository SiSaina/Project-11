const API_URL = 'http://127.0.0.1:8000';

function getToken() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  return token;
}

export async function getImage({ id = null, includeProducts = false} = {}) {
  const token = getToken();
  const queryParams = new URLSearchParams();

  if (includeProducts) queryParams.append('includeProducts', 'true');
  let url = `${API_URL}/api/v1/images`;

  if (id) {
    url += `/${id}`;
  }
  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch images');
  }

  return res.json();
}

export async function postImage(imageData) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/v1/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(imageData),
  });

  if (!res.ok) throw new Error('Failed to create image');
  return res.json();
}

export async function putImage(id, imageData) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/v1/images/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(imageData),
  });

  if (!res.ok) throw new Error('Failed to update image');
  return res.json();
}

export async function patchImage(id, partialData) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/v1/images/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(partialData),
  });

  if (!res.ok) throw new Error('Failed to patch image');
  return res.json();
}

export async function deleteImage(id) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/v1/images/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete image');
  return true;
}