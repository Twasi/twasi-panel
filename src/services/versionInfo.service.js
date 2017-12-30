import fetch from './fetch';

async function get() {
  const url = `${window.env.API_URL}/version`;
  return fetch(url, 'GET');
}

export default { get };
