import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillSemester, fillSemesters } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillSemester,
    fillSemesters,
  },
  store.dispatch,
);
