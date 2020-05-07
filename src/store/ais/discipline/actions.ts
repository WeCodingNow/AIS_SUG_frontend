import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { getDiscipline, getDisciplines } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    getDiscipline,
    getDisciplines,
  },
  store.dispatch,
);
