import fetch from '../fetch';

async function get() {
  const url = `${window.env.API_URL}/user/events`;
  return fetch(url, 'GET');
}

export default { get };
