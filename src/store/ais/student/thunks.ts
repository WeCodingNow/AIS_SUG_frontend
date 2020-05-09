import { putStudent, changeStudentLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters } from '../../general/thunks';
import { toStudent } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Student);
const { putOne, putAll } = makePutters(putStudent, changeStudentLoadingState, toStudent, {
  getOne,
  getAll,
});

export { getOne as getStudent, getAll as getStudents, putOne as fillStudent, putAll as fillStudents };
