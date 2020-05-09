import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillControlEvent, fillControlEvents } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillControlEvent,
    fillControlEvents,
  },
  store.dispatch,
);
