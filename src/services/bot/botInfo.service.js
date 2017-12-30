async function get() {
  const url = `${window.env.API_URL}/bot`;
  return fetch(url, 'GET');
}

export default { get };
