import { putBacklog, changeBacklogLoadingState } from './creators';

import AisAPI from '../../../services/ais';
import { makeGetters, makePutters, makeCreator } from '../../general/thunks';
import { toBacklog, toBackBacklog } from './types';

const { getOne, getAll } = makeGetters(AisAPI.Backlog);
const { putOne, putAll } = makePutters(putBacklog, changeBacklogLoadingState, toBacklog, {
  getOne,
  getAll,
});
const create = makeCreator(AisAPI.Backlog, putBacklog, toBacklog, toBackBacklog);

export {
  getOne as getBacklog,
  getAll as getBacklogs,
  putOne as fillBacklog,
  putAll as fillBacklogs,
  create as createBacklog,
};
