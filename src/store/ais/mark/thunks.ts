import { putMark, changeMarkLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters } from '../../general/thunks';
import { toMark } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Mark);
const { putOne, putAll } = makePutters(putMark, changeMarkLoadingState, toMark, {
  getOne,
  getAll,
});

export { getOne as getMark, getAll as getMarks, putOne as fillMark, putAll as fillMarks };
