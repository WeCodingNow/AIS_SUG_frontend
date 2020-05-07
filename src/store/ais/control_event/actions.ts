import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getControlEvent, getControlEvents } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getControlEvent,
    getControlEvents,
  },
  store.dispatch,
);
