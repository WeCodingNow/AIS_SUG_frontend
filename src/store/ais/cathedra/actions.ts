import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillCathedra, fillCathedras } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillCathedra,
    fillCathedras,
  },
  store.dispatch,
);
