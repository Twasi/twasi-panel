import fetch from '../fetch';

async function get() {
  const url = `${window.env.API_URL}/plugins`;
  return fetch(url, 'GET');
}

export default { get };
