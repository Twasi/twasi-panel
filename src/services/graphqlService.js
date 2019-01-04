import fetch from './fetch';

const getGraph = query => fetch(window.env.GRAPHQL_URL, 'post', `query=${encodeURI(query)}`);

const getUserGraph = (query, jwt, target) => {
  if (jwt === null) {
    // eslint-disable-next-line
    console.log('Not authenticated, could not do request.');
    return null;
  }
  const actualTarget = target == null ? 'panel' : target;
  return new Promise(resolve => {
    getGraph(`query{${actualTarget}(token:"${jwt}"){${query}}}`).then(data => {
      resolve(data.data[actualTarget]);
    });
  });
};

export { getUserGraph };
export default getGraph;
