import { putDiscipline, changeDisciplineLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters } from '../../general/thunks';
import { toDiscipline } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Discipline);
const { putOne, putAll } = makePutters(putDiscipline, changeDisciplineLoadingState, toDiscipline, {
  getOne,
  getAll,
});

export { getOne as getDiscipline, getAll as getDisciplines, putOne as fillDiscipline, putAll as fillDisciplines };
