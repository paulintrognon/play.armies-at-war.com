import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';

import store from './store.js';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Layout>
              <Home></Home>
          </Layout>
      </Provider>
    );
  }
}

export default App;
