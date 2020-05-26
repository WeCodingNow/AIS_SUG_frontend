import { bindActionCreators } from 'redux';

import { store } from '../../store';

import { putSelectedSemester, deselectSemester, putSelecteDiscipline, deselectStudentDiscipline } from './creators';
import { loadOwnStudent } from './thunks';

export default bindActionCreators(
  {
    putSelectedSemester,
    deselectSemester,
    selectStudentDiscipline: putSelecteDiscipline,
    deselectStudentDiscipline,
    loadOwnStudent,
  },
  store.dispatch,
);
