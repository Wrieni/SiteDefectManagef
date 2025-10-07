// Simple auth helpers: store token+role in cookie (path=/). Prefer setting HttpOnly cookie from server in production.
export const setToken = (token) => {
  document.cookie = `authToken=${encodeURIComponent(token)}; path=/`;
}

export const setUserRole = (role) => {
  document.cookie = `userRole=${encodeURIComponent(role)}; path=/`;
}

export const setUserFirstName = (fn) => {
  document.cookie = `userFirstName=${encodeURIComponent(fn)}; path=/`;
}

export const setUserLastName = (ln) => {
  document.cookie = `userLastName=${encodeURIComponent(ln)}; path=/`;
}

export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export const getToken = () => getCookie('authToken');
export const getUserRole = () => getCookie('userRole');
export const getUserFirstName = () => getCookie('userFirstName');
export const getUserLastName = () => getCookie('userLastName');

export const clearAuth = () => {
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'userFirstName=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'userLastName=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
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
  setUserFirstName,
  setUserLastName,
  getToken,
  getUserRole,
  getUserFirstName,
  getUserLastName,
  clearAuth,
  authFetch
}
