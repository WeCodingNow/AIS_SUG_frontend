import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
};

export const store = createStore(persistReducer(persistConfig, reducer), composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);

export type State = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
