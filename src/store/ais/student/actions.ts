import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillStudent, fillStudents, createStudent } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillStudent,
    fillStudents,
    createStudent,
  },
  store.dispatch,
);
