import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillGroup, fillGroups } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillGroup,
    fillGroups,
  },
  store.dispatch,
);
