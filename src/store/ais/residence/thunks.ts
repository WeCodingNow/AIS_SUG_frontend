import { putResidence, changeResidenceLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters } from '../../general/thunks';
import { toResidence } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Residence);
const { putOne, putAll } = makePutters(putResidence, changeResidenceLoadingState, toResidence, {
  getOne,
  getAll,
});

export { getOne as getResidence, getAll as getResidences, putOne as fillResidence, putAll as fillResidences };
