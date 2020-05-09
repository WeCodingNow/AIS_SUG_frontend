import { putContact, changeContactLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters } from '../../general/thunks';
import { toContact } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Contact);
const { putOne, putAll } = makePutters(putContact, changeContactLoadingState, toContact, {
  getOne,
  getAll,
});

export { getOne as getContact, getAll as getContacts, putOne as fillContact, putAll as fillContacts };
