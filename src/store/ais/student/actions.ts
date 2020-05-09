import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillStudent, fillStudents } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillStudent,
    fillStudents,
  },
  store.dispatch,
);
