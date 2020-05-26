import { putMark, changeMarkLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters, makeCreator } from '../../general/thunks';
import { toMark, toBackMark } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Mark);
const { putOne, putAll } = makePutters(putMark, changeMarkLoadingState, toMark, {
  getOne,
  getAll,
});

const create = makeCreator(AisAPI.Mark, putMark, toMark, toBackMark);

export { getOne as getMark, getAll as getMarks, putOne as fillMark, putAll as fillMarks, create as createMark };
