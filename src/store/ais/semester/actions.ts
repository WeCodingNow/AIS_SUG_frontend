import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getSemester, getSemesters } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getSemester,
    getSemesters,
  },
  store.dispatch,
);
