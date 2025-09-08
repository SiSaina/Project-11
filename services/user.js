const API_URL = 'http://127.0.0.1:8000';

function getToken() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  return token;
}

export async function getUser({ id = null, includeAddresses = true } = {}) {
  const token = getToken();
  const queryParams = new URLSearchParams();

  if (includeAddresses) queryParams.append('includeAddresses', 'true');

  let url = `${API_URL}/api/user`;

  if (id) {
    url += `/${id}`;
  } else {
    url += ``;
  }

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  alert(JSON.stringify(url));
  
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch user');

  return res.json();
}
