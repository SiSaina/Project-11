const API_URL = 'http://127.0.0.1:8000';

function getToken() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  return token;
}

export async function getProduct({ id = null, includeImages = false, includeOrders = false, includeCategory = false } = {}) {
  const token = getToken();
  const queryParams = new URLSearchParams();

  if (includeImages) queryParams.append('includeImages', 'true');
  if (includeOrders) queryParams.append('includeOrders', 'true');
  if (includeCategory) queryParams.append('includeCategory', 'true');

  let url = `${API_URL}/api/v1/products`;

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
    throw new Error('Failed to fetch products');
  }

  return res.json();
}
export async function getOneProduct(productId, options = {}) {
  const token = getToken();
  const params = new URLSearchParams();
  if (options.includeImages) params.append("includeImages", "true");
  if (options.includeOrders) params.append("includeOrders", "true");
  if (options.includeCategory) params.append("includeCategory", "true");

  const res = await fetch(`${API_URL}/api/v1/products/${productId}?${params.toString()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    console.error("Failed to fetch product:", errBody);
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function postProduct(productData) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/v1/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    console.error("Product creation failed:", errBody);
    throw new Error('Failed to create product');
  }
  return res.json();
}

export async function putProduct(id, productData) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/v1/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function patchProduct(id, partialData) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/v1/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(partialData),
  });

  if (!res.ok) throw new Error('Failed to patch product');
  return res.json();
}

export async function deleteProduct(id) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/v1/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete product');
  return true;
}