import { HashTable, HashToArray } from '../store/types';
import { Semester } from '../store/ais/semester/types';
import { Group } from '../store/ais/group/types';
import { Cathedra } from '../store/ais/cathedra/types';
import { Student } from '../store/ais/student/types';

export const getLastSemester = (semesters: HashTable<Semester>) =>
  HashToArray(semesters).sort((lhs, rhs) => (lhs.number < rhs.number ? 1 : lhs.number === rhs.number ? 0 : -1))[0];

export const getCurrentSemesterNumber = (groupID: number, groups: HashTable<Group>, semesters: HashTable<Semester>) =>
  getLastSemester(groups[groupID].semesterIDs.map((semID) => semesters[semID])).number;

export const makeCurrentSemesterGetter = (groups: HashTable<Group>, semesters: HashTable<Semester>) => (
  groupID: number,
) => getCurrentSemesterNumber(groupID, groups, semesters);

export const makeGroupName = (
  groupID: number,
  groups: HashTable<Group>,
  semesters: HashTable<Semester>,
  cathedras: HashTable<Cathedra>,
) =>
  `${cathedras[groups[groupID].cathedraID].shortName} - ${getCurrentSemesterNumber(groupID, groups, semesters)}${
    groups[groupID].number
  }`;

export const getStudentShortname = (st: Student) =>
  `${st.secondName} ${st.name[0]}.${st.thirdName ? `${st.thirdName[0]}.` : ''}`;
