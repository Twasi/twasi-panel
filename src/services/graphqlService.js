import fetch from './fetch';

const getGraph = query => fetch(window.env.GRAPHQL_URL, 'post', `query=${encodeURI(query)}`);

const getUserGraph = query => getGraph(query);

export { getUserGraph };
export default getGraph;
