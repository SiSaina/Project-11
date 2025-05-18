const API_URL = 'http://127.0.0.1:8000';

export async function csrf() {
    await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
    });
}

export async function register(name, email, password) {
    await csrf();

    const res = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    const data = await res.json();
    localStorage.setItem('token', data.access_token);
    return data.user;
}

export async function login(email, password) {
    await csrf();

    const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    localStorage.setItem('token', data.access_token);
    return data.user;
}

export async function getUser() {
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


export async function logout() {
    const token = localStorage.getItem('token');

    await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    });
}

