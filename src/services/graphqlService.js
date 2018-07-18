import fetch from './fetch';

const getGraph = query => fetch(window.env.GRAPHQL_URL, 'post', `query=${encodeURI(query)}`);

const getUserGraph = (query, jwt) => {
  if (jwt === null) {
    // eslint-disable-next-line
    console.log('Not authenticated, could not do request.');
    return null;
  }
  return getGraph(`query{viewer(token:"${jwt}"){${query}}}`);
};

export { getUserGraph };
export default getGraph;
