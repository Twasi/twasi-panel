async function post() {
  const url = `${window.env.API_URL}/bot/stop`;
  return fetch(url, 'POST');
}

export default { post };
