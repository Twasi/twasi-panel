import config from '../../config';

const stopService = jwt => () =>
  new Promise((resolve, reject) => {
    fetch(`${config.api_url}/bot/stop`, {
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

export default stopService;
