import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillMark, fillMarks, createMark } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillMark,
    fillMarks,
    createMark,
  },
  store.dispatch,
);
