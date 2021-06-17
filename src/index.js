import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from "@apollo/client"
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from 'apollo-link-context'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store';

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
  // uri: "http://ec2-54-179-183-246.ap-southeast-1.compute.amazonaws.com/graphql"
})

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  // uri: "ws://ec2-54-179-183-246.ap-southeast-1.compute.amazonaws.com/graphql",
  options: {
    reconnect: true
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
  wsLink,
  httpLink,
);

const authorizationLink = setContext(() => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authorizationLink.concat(splitLink),
  // cache: new InMemoryCache(),
  cache: new InMemoryCache({
    typePolicies: {
      TaskColumn: {
        fields: {
          tasks: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    }
  }),
  connectToDevTools: true,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);


reportWebVitals();
