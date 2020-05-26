import contact from './contact/actions';
import contactType from './contact_type/actions';
import controlEvent from './control_event/actions';
import controlEventType from './control_event_type/actions';
import discipline from './discipline/actions';
import group from './group/actions';
import mark from './mark/actions';
import backlog from './backlog/actions';
import residence from './residence/actions';
import semester from './semester/actions';
import student from './student/actions';
import cathedra from './cathedra/actions';

export default {
  contact: { fill: contact.fillContact, fillAll: contact.fillContacts },
  contactType: { fill: contactType.fillContactType, fillAll: contactType.fillContactTypes },
  controlEvent: { fill: controlEvent.fillControlEvent, fillAll: controlEvent.fillControlEvents },
  controlEventType: { fill: controlEventType.fillControlEventType, fillAll: controlEventType.fillControlEventTypes },
  discipline: { fill: discipline.fillDiscipline, fillAll: discipline.fillDisciplines },
  group: { fill: group.fillGroup, fillAll: group.fillGroups },
  mark: { fill: mark.fillMark, fillAll: mark.fillMarks, create: mark.createMark },
  backlog: { fill: backlog.fillBacklog, fillAll: backlog.fillBacklogs, create: backlog.createBacklog },
  residence: { fill: residence.fillResidence, fillAll: residence.fillResidences, create: residence.createResidence },
  semester: { fill: semester.fillSemester, fillAll: semester.fillSemesters },
  student: { fill: student.fillStudent, fillAll: student.fillStudents, create: student.createStudent },
  cathedra: { fill: cathedra.fillCathedra, fillAll: cathedra.fillCathedras },
};
