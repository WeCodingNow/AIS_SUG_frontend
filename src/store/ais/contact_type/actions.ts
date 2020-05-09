import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillContactType, fillContactTypes } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillContactType,
    fillContactTypes,
  },
  store.dispatch,
);
