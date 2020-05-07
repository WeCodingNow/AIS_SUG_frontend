import { combineReducers } from 'redux';

import contactReducer from './contact/reducers';
import contactTypeReducer from './contact_type/reducers';
import controlEventReducer from './control_event/reducers';
import controlEventTypeReducer from './control_event_type/reducers';
import disciplineReducer from './discipline/reducers';
import groupReducer from './group/reducers';
import markReducer from './mark/reducers';
import residenceReducer from './residence/reducers';
import semesterReducer from './semester/reducers';
import studentReducer from './student/reducers';

const reducer = combineReducers({
  contact: contactReducer,
  contactType: contactTypeReducer,
  controlEvent: controlEventReducer,
  controlEventType: controlEventTypeReducer,
  discipline: disciplineReducer,
  group: groupReducer,
  mark: markReducer,
  residence: residenceReducer,
  semester: semesterReducer,
  student: studentReducer,
});

export default reducer;
