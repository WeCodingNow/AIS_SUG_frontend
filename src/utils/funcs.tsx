import { HashTable } from '../store/types';
import { Semester } from '../store/ais/semester/types';
import { Group } from '../store/ais/group/types';
import { Cathedra } from '../store/ais/cathedra/types';
import { Student } from '../store/ais/student/types';

export const getCurrentSemesterNumber = (groupID: number, groups: HashTable<Group>, semesters: HashTable<Semester>) =>
  groups[groupID].semesterIDs
    .map((semID) => semesters[semID].number)
    .reduce((prevSemN, curSemN) => (prevSemN > curSemN ? prevSemN : curSemN));

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
