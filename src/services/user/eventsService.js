import config from '../../config';

const eventsService = jwt => () =>
  new Promise((resolve, reject) => {
    fetch(`${config.api_url}/user/events`, {
      method: 'GET',
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

export default eventsService;
