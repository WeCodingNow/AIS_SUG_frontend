import { bindActionCreators } from 'redux';

import { store } from '../../store';

import {
  deselectStudent,
  deselectSemester,
  deselectStudentDiscipline,
  applyMoscowiteFilter,
  applyCommunityFilter,
} from './creators';
import { loadOwnGroup, selectStudent } from './thunks';

export default bindActionCreators(
  {
    deselectStudent,
    deselectSemester,
    deselectStudentDiscipline,
    loadOwnGroup,
    selectStudent,
    applyMoscowiteFilter,
    applyCommunityFilter,
  },
  store.dispatch,
);
