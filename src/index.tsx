import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import { store, persistor } from './store/store';
import './index.css';

declare global {
  interface Window {
    store: Store;
    persistor: typeof persistor;
  }
}

window.store = store;
window.persistor = persistor;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
