const API_URL = 'http://127.0.0.1:8000';

function getToken() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  return token;
}

// Get authenticated user profile
export async function getUser() {
  const token = getToken();
  const url = `${API_URL}/api/user?includeAddresses=true`;
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


// Get authenticated user addresses only
export async function getUserAddress() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    const res = await fetch(`${API_URL}/api/user?includeAddresses=true`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
}