import config from '../config';

const userInfoService = jwt => callback =>
  fetch(`${config.api_url}/info`, {
    method: 'GET',
    headers: { authorization: `Bearer ${jwt}` }
  }).then(response => {
    response.json().then(data => callback(data));
  });

export default userInfoService;
