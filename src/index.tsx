import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Store } from 'redux';

declare global {
  interface Window {
    store: Store;
  }
}

window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
