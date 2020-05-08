import { putCathedra, changeCathedraLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters } from '../../general/thunks';
import { toCathedra } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Cathedra);
const { putOne, putAll } = makePutters(putCathedra, changeCathedraLoadingState, toCathedra, { getOne, getAll });

export { getOne as getCathedra, getAll as getCathedras, putOne as fillCathedra, putAll as fillCathedras };
