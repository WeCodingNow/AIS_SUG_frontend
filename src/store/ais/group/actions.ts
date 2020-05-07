import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getGroup, getGroups } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getGroup,
    getGroups,
  },
  store.dispatch,
);
