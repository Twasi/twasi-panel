import config from '../../config';

const startService = jwt => () =>
  new Promise((resolve, reject) => {
    fetch(`${config.api_url}/bot/start`, {
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
