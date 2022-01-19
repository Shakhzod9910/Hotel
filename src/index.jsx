import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router } from 'react-router-dom';


const httpLink = createHttpLink({
  uri: 'http://192.168.1.9:4000/graphql',
});
const wsLink = () => {
  return new WebSocketLink({
      uri: "ws://192.168.1.9:4000/graphql",
      options: {
      reconnect: true,
      timeout: 30000,
      connectionParams: {
        token: 'lqjkwgdqvedbcqwfcqxwcvvq'
      }
    }
  })
}

const authLink = setContext(async(_, { headers }) => {
return {
  headers: {
    ...headers,
    authorization: "quwhgdqhghdnmghdhwjhbdmhqfvdvqngg",
  }
}
});

const splitLink = split(
({ query }) => {
  const definition = getMainDefinition(query);
  return (
  definition.kind === 'OperationDefinition' &&
  definition.operation === 'subscription'
  );
},
wsLink(),
authLink.concat(httpLink)
)

const client = new ApolloClient({
link: splitLink,
cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
       <App />
     </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
