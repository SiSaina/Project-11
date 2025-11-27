const API_URL = 'http://127.0.0.1:8000';

function getToken() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  return token;
}

export async function getOrder({ id = null } = {}) {
  const token = getToken();
  const queryParams = new URLSearchParams();

  let url = `${API_URL}/api/v1/orders`;

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
    throw new Error('Failed to fetch orders');
  }

  return res.json();
}

export async function postOrder(orderData) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/v1/orders/bulk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    console.error("Order creation failed:", errBody);
    throw new Error('Failed to create order');
  }
  return res.json();
}

export async function deleteOrder(id) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/v1/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete order');
  return true;
}