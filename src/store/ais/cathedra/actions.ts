import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getCathedra, getCathedras } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getCathedra,
    getCathedras,
  },
  store.dispatch,
);
