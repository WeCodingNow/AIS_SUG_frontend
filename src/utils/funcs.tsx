import { HashTable } from '../store/types';
import { Semester } from '../store/ais/semester/types';
import { Group } from '../store/ais/group/types';

export const getCurrentSemesterNumber = (groupID: number, groups: HashTable<Group>, semesters: HashTable<Semester>) =>
  groups[groupID].semesterIDs
    .map((semID) => semesters[semID].number)
    .reduce((prevSemN, curSemN) => (prevSemN > curSemN ? prevSemN : curSemN));

export const makeCurrentSemesterGetter = (groups: HashTable<Group>, semesters: HashTable<Semester>) => (
  groupID: number,
) => getCurrentSemesterNumber(groupID, groups, semesters);
