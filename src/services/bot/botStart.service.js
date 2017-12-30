async function post() {
  const url = `${window.env.API_URL}/bot/start`;
  return fetch(url, 'POST');
}

export default { post };
