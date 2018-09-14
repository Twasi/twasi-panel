import fetch from './fetch';

const getGraph = query => fetch(window.env.GRAPHQL_URL, 'post', `query=${encodeURI(query)}`);

const getUserGraph = (query, jwt) => {
  if (jwt === null) {
    // eslint-disable-next-line
    console.log('Not authenticated, could not do request.');
    return null;
  }
  return new Promise(resolve => {
    getGraph(`query{panel(token:"${jwt}"){${query}}}`).then(data => {
      resolve(data.data.panel);
    });
  });
};

export { getUserGraph };
export default getGraph;
