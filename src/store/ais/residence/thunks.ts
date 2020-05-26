import { putResidence, changeResidenceLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters, makeCreator } from '../../general/thunks';
import { toResidence, toBackResidence } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Residence);
const { putOne, putAll } = makePutters(putResidence, changeResidenceLoadingState, toResidence, {
  getOne,
  getAll,
});
const create = makeCreator(AisAPI.Residence, putResidence, toResidence, toBackResidence);

export {
  getOne as getResidence,
  getAll as getResidences,
  putOne as fillResidence,
  putAll as fillResidences,
  create as createResidence,
};
