import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getStudent, getStudents } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getStudent,
    getStudents,
  },
  store.dispatch,
);
