import { putControlEventType, changeControlEventTypeLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters } from '../../general/thunks';
import { toControlEventType } from './types';

const { getOne, getAll } = makeGetters(AisAPI.ControlEventType);
const { putOne, putAll } = makePutters(putControlEventType, changeControlEventTypeLoadingState, toControlEventType, {
  getOne,
  getAll,
});

export {
  getOne as getControlEventType,
  getAll as getControlEventTypes,
  putOne as fillControlEventType,
  putAll as fillControlEventTypes,
};
