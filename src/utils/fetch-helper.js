import nodeFetch from 'node-fetch';

const fetchHelper = ({
  endpoint,
  method = 'GET',
  clientId,
  token,
  ...otherProps
} = {}) => {
  if (!endpoint) {
    return Promise.reject(new Error('An endpoint is required.'));
  }

  if (!clientId && !token) {
    return Promise.reject(new Error('A client ID or token is required.'));
  }

  // In the browser, nodeFetch resolves to false, so use window.fetch instead.
  const fetchFn = nodeFetch || window.fetch;

  // Construct headers object.
  const headers = token
    ? { Authorization: `OAuth ${token}` }
    : { 'Client-ID': clientId };

  return fetchFn(endpoint, {
    ...otherProps,
    method,
    headers: {
      ...headers,
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  })
    .then(res => res.json());
};

export default fetchHelper;
