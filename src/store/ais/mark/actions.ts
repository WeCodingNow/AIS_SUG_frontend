import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getMark, getMarks } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getMark,
    getMarks,
  },
  store.dispatch,
);
