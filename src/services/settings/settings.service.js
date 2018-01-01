import fetch from '../fetch';

async function get() {
  const url = `${window.env.API_URL}/settings`;
  return fetch(url, 'GET');
}

async function put(request) {
  const url = `${window.env.API_URL}/settings`;
  return fetch(url, 'PUT', request);
}

export default { get, put };
