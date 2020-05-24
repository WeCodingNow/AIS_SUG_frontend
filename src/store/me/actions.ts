import { bindActionCreators } from 'redux';

import { store } from '../store';
import { fillRole, fillInfo } from './thunks';

export default bindActionCreators({ fillRole, fillInfo }, store.dispatch);
