import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Auth from './utils/auth';

const token = Auth.getToken() || null;

const client = new ApolloClient({
  url: '/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`,
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' element={ <SearchBooks />} />
            <Route exact path='/saved' component={ <SavedBooks />} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
