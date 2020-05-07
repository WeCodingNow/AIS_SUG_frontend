import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getResidence, getResidences } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getResidence,
    getResidences,
  },
  store.dispatch,
);
