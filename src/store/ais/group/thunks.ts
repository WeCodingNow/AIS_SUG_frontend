import { putGroup, changeGroupLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters } from '../../general/thunks';
import { toGroup } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Group);
const { putOne, putAll } = makePutters(putGroup, changeGroupLoadingState, toGroup, { getOne, getAll });

export { getOne as getGroup, getAll as getGroups, putOne as fillGroup, putAll as fillGroups };
