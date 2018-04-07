import fetch from './fetch';

const getGraph = query => fetch(window.env.GRAPHQL_URL, 'post', `query=${encodeURI(query)}`);

const getUserGraph = (query, jwt) => getGraph(`query{viewer(token:"${jwt}"){${query}}}`);

export { getUserGraph };
export default getGraph;
