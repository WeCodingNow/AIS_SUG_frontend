import { bindActionCreators } from 'redux';

import { store } from '../../store';
import { fillDiscipline, fillDisciplines } from './thunks';
// import {} from './creators';

export default bindActionCreators(
  {
    fillDiscipline,
    fillDisciplines,
  },
  store.dispatch,
);
