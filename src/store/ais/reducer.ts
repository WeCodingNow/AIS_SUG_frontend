import { combineReducers } from 'redux';

import cathedraReducer from './cathedra/reducers';
import groupReducer from './group/reducers';
import semesterReducer from './semester/reducers';
import controlEventReducer from './control_event/reducers';
import controlEventTypeReducer from './control_event_type/reducers';
import studentReducer from './student/reducers';
import contactReducer from './contact/reducers';
import contactTypeReducer from './contact_type/reducers';
import residenceReducer from './residence/reducers';
import disciplineReducer from './discipline/reducers';
import markReducer from './mark/reducers';
import backlogReducer from './backlog/reducers';

const reducer = combineReducers({
  cathedra: cathedraReducer,
  group: groupReducer,
  semester: semesterReducer,
  controlEvent: controlEventReducer,
  controlEventType: controlEventTypeReducer,
  student: studentReducer,
  contact: contactReducer,
  contactType: contactTypeReducer,
  residence: residenceReducer,
  discipline: disciplineReducer,
  mark: markReducer,
  backlog: backlogReducer,
});

export default reducer;
