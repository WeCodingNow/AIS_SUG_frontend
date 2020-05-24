import { bindActionCreators } from 'redux';

import { store } from '../store';

import { fillStudentBindings, fillRoles, promoteUser } from './thunks';

export default bindActionCreators(
  {
    fillStudentBindings,
    fillRoles,
    promoteUser,
  },
  store.dispatch,
);
