import { combineReducers } from 'redux';

import controlEventTypeReducer from './control_event_type/reducers';
import studentReducer from './student/reducers';
import controlEventReducer from './control_event/reducers';
import groupReducer from './group/reducers';
import markReducer from './mark/reducers';
import disciplineReducer from './discipline/reducers';
import contactTypeReducer from './contact_type/reducers';
import residenceReducer from './residence/reducers';
import semesterReducer from './semester/reducers';

const reducer = combineReducers({
  controlEventType: controlEventTypeReducer,
  student: studentReducer,
  controlEvent: controlEventReducer,
  group: groupReducer,
  mark: markReducer,
  discipline: disciplineReducer,
  contactType: contactTypeReducer,
  residence: residenceReducer,
  semester: semesterReducer,
});

export default reducer;
