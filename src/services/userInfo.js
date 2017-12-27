const userInfoService = jwt => () =>
  new Promise((resolve, reject) => {
    fetch(`${window.env.API_URL}/info`, {
      method: 'GET',
      headers: { authorization: `Bearer ${jwt}` }
    })
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          response.json().then(data => resolve(data));
        } else throw new Error(`Request failed: ${response.status}`);
      })
      .catch(err => reject(err));
  });

export default userInfoService;
