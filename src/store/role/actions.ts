import { bindActionCreators } from 'redux';

import { store } from '../store';
import { fillRole } from './thunks';

export default bindActionCreators({ fill: fillRole }, store.dispatch);
