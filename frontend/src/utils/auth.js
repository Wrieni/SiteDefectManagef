// Simple auth helpers: store token+role in cookie (path=/). Prefer setting HttpOnly cookie from server in production.
export const setToken = (token) => {
  document.cookie = `authToken=${encodeURIComponent(token)}; path=/`;
}

export const setUserRole = (role) => {
  document.cookie = `userRole=${encodeURIComponent(role)}; path=/`;
}

export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export const getToken = () => getCookie('authToken');
export const getUserRole = () => getCookie('userRole');

export const clearAuth = () => {
  // remove cookies by setting expiration in the past
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

// fetch wrapper that adds Authorization header when token exists
export const authFetch = (input, init = {}) => {
  const token = getToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetch(input, { ...init, headers });
}

export default {
  setToken,
  setUserRole,
  getToken,
  getUserRole,
  clearAuth,
  authFetch
}
