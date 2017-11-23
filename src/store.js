import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducers from './reducers';

const middlewares = [
  promise(),
  thunk,
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const middleware = applyMiddleware(...middlewares);

export default createStore(reducers, middleware);
