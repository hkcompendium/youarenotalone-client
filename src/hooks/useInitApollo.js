import ApolloClient from 'apollo-client';
import { useMemo } from 'react';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import _ from 'lodash';

const create = (token, onUnauthorizedError) => {
  const authorizationHeader = token && { 'Authorization': `Bearer ${token}` };
  const authLink = setContext((__, { headers }) => ({
    headers: {
      ...headers,
      ...authorizationHeader,
    },
  }));
  const httpLink = new HttpLink({ uri: 'https://hkcompendium.org/graphql', credentials: "same-origin" });


  return new ApolloClient({
    uri: 'https://hkcompendium.org/graphql',
    link: ApolloLink.from([onError(({
      graphQLErrors, networkError, operation,
    }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          // eslint-disable-next-line no-console
          console.error(`[GraphQL error]: ${message}`, {
            locations,
            operationName: operation && operation.operationName,
            path,
          });
        });
      }
      if (networkError) {
        const errorCode = networkError.response && networkError.response.status;
        if (errorCode === 401) {
          onUnauthorizedError(networkError);
        } else {
          console.error('network error when fetching', networkError);
        }
      }
    }), authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

// eslint-disable-next-line react-hooks/exhaustive-deps
const useInitApollo = ({ onUnauthorizedError, token }) => useMemo(() => create(_.isEmpty(token) ? undefined : token, onUnauthorizedError), [token]);

export default useInitApollo;
