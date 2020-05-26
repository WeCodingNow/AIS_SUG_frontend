import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillBacklog, fillBacklogs, createBacklog } from './thunks';

export default bindActionCreators(
  {
    fillBacklog,
    fillBacklogs,
    createBacklog,
  },
  store.dispatch,
);
