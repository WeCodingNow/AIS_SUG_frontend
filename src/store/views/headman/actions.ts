import { bindActionCreators } from 'redux';

import { store } from '../../store';

import {
  deselectStudent,
  putSelectedSemester,
  deselectSemester,
  selectStudentDiscipline,
  deselectStudentDiscipline,
  applyMoscowiteFilter,
  applyCommunityFilter,
} from './creators';
import { loadOwnGroup, selectStudent } from './thunks';

export default bindActionCreators(
  {
    deselectStudent,
    putSelectedSemester,
    deselectSemester,
    selectStudentDiscipline,
    deselectStudentDiscipline,
    loadOwnGroup,
    selectStudent,
    applyMoscowiteFilter,
    applyCommunityFilter,
  },
  store.dispatch,
);
