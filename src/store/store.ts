import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

const persistConfig = {
  key: 'root',
  blacklist: ['auth', 'view'],
  storage,
};

export type State = ReturnType<typeof reducer>;

export const store = createStore(
  persistReducer(persistConfig, reducer),
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<State>)),
);

// export const store = createStore(persistReducer(persistConfig, reducer), applyMiddleware(thunk));
export const persistor = persistStore(store);

// export type State = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
