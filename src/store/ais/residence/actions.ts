import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillResidence, fillResidences, createResidence } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillResidence,
    fillResidences,
    createResidence,
  },
  store.dispatch,
);
