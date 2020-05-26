import { putStudent, changeStudentLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters, makeCreator } from '../../general/thunks';
import { toStudent, toBackStudent } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Student);
const { putOne, putAll } = makePutters(putStudent, changeStudentLoadingState, toStudent, {
  getOne,
  getAll,
});
const create = makeCreator(AisAPI.Student, putStudent, toStudent, toBackStudent);

export {
  getOne as getStudent,
  getAll as getStudents,
  putOne as fillStudent,
  putAll as fillStudents,
  create as createStudent,
};
