import { putControlEvent, changeControlEventLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters } from '../../general/thunks';
import { toControlEvent } from './types';

const { getOne, getAll } = makeGetters(AisAPI.ControlEvent);
const { putOne, putAll } = makePutters(putControlEvent, changeControlEventLoadingState, toControlEvent, {
  getOne,
  getAll,
});

export {
  getOne as getControlEvent,
  getAll as getControlEvents,
  putOne as fillControlEvent,
  putAll as fillControlEvents,
};
