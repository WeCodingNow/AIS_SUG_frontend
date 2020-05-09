import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillResidence, fillResidences } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillResidence,
    fillResidences,
  },
  store.dispatch,
);
