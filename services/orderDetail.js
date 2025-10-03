const API_URL = 'http://127.0.0.1:8000';

function getToken() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  return token;
}

export async function getOrderDetail({ id = null } = {}) {
  const token = getToken();
  const queryParams = new URLSearchParams();

  let url = `${API_URL}/api/v1/OrderDetails`;

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
    throw new Error('Failed to fetch OrderDetails');
  }

  return res.json();
}

export async function postOrderDetail(OrderDetailData) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/v1/OrderDetails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(OrderDetailData),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    console.error("OrderDetail creation failed:", errBody);
    throw new Error('Failed to create OrderDetail');
  }
  return res.json();
}

export async function deleteOrderDetail(id) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/v1/OrderDetails/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete OrderDetail');
  return true;
}