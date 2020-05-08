import { putSemester, changeSemesterLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters } from '../../general/thunks';
import { toSemester } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Semester);
const { putOne, putAll } = makePutters(putSemester, changeSemesterLoadingState, toSemester, { getOne, getAll });

export { getOne as getSemester, getAll as getSemesters, putOne as fillSemester, putAll as fillSemesters };
