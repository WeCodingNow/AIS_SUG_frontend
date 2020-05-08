import contact from './contact/actions';
import contactType from './contact_type/actions';
import controlEvent from './control_event/actions';
import controlEventType from './control_event_type/actions';
import discipline from './discipline/actions';
import group from './group/actions';
import mark from './mark/actions';
import residence from './residence/actions';
import semester from './semester/actions';
import student from './student/actions';
import cathedra from './cathedra/actions';

export default {
  contact: { get: contact.getContact, getAll: contact.getContacts },
  contactType: { get: contactType.getContactType, getAll: contactType.getContactTypes },
  controlEvent: { get: controlEvent.getControlEvent, getAll: controlEvent.getControlEvents },
  controlEventType: { get: controlEventType.getControlEventType, getAll: controlEventType.getControlEventTypes },
  discipline: { get: discipline.getDiscipline, getAll: discipline.getDisciplines },
  group: { fill: group.fillGroup, fillAll: group.fillGroups },
  mark: { get: mark.getMark, getAll: mark.getMarks },
  residence: { get: residence.getResidence, getAll: residence.getResidences },
  semester: { fill: semester.fillSemester, fillAll: semester.fillSemesters },
  student: { get: student.getStudent, getAll: student.getStudents },
  cathedra: { fill: cathedra.fillCathedra, fillAll: cathedra.fillCathedras },
};
