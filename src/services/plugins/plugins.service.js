import fetch from '../fetch';

async function get(page = 0, q = '') {
  const url = `${window.env.API_URL}/plugins?page=${page}&q=${q}`;
  return fetch(url, 'GET');
}

async function post(request) {
  const url = `${window.env.API_URL}/plugins`;
  return fetch(url, 'POST', request);
}

export default { get, post };
