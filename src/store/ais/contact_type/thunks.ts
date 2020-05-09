import { putContactType, changeContactTypeLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters } from '../../general/thunks';
import { toContactType } from './types';

const { getOne, getAll } = makeGetters(AisAPI.ContactType);
const { putOne, putAll } = makePutters(putContactType, changeContactTypeLoadingState, toContactType, {
  getOne,
  getAll,
});

export { getOne as getContactType, getAll as getContactTypes, putOne as fillContactType, putAll as fillContactTypes };

