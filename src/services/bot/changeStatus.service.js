import fetch from '../fetch';

async function post(status) {
  const url = `${window.env.API_URL}/bot/${status}`;
  return fetch(url, 'POST');
}

export default { post };
