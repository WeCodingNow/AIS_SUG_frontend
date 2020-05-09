import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillMark, fillMarks } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillMark,
    fillMarks,
  },
  store.dispatch,
);
