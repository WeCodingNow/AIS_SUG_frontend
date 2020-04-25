import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import store from './store/store';
import './index.css';

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
