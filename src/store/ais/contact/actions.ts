// import * as creators from './creators';
import * as thunks from './thunks';
import { store } from '../../store';
import { bindActionCreators } from 'redux';

export default {
  ...bindActionCreators(thunks, store.dispatch),
};
