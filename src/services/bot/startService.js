const startService = jwt => () =>
  new Promise((resolve, reject) => {
    fetch(`${window.env.API_URL}/bot/start`, {
      method: 'POST',
      headers: { authorization: `Bearer ${jwt}` }
    })
      .then(response => {
        response
          .json()
          .then(data => resolve(data))
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  });

export default startService;
