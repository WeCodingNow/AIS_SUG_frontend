import { createStore } from 'redux';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

export const store = createStore(reducer, composeWithDevTools());

type Store = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<Store> = useReduxSelector;
