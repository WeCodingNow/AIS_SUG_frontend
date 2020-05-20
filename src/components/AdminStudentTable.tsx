import React from 'react';

import { HashToArray, HashTable } from '../store/types';

import { Student } from '../store/ais/student/types';
import { Group } from '../store/ais/group/types';
import { Semester } from '../store/ais/semester/types';
import { Cathedra } from '../store/ais/cathedra/types';

import { makeCurrentSemesterGetter } from '../utils/funcs';

interface AdminStudentTableProps {
  students: HashTable<Student>;
  groups: HashTable<Group>;
  cathedras: HashTable<Cathedra>;
  semesters: HashTable<Semester>;
}

const AdminStudentTable: React.FC<AdminStudentTableProps> = ({
  students,
  groups,
  cathedras,
  semesters,
}: AdminStudentTableProps) => {
  const studentsMap = HashToArray(students);
  const getCurrentSemesterNumber = makeCurrentSemesterGetter(groups, semesters);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя</th>
          <th scope="col">Отчество</th>
          <th scope="col">Группа</th>
        </tr>
      </thead>
      <tbody>
        {studentsMap.map((st) => (
          <tr key={st.id}>
            <th scope="row">{st.id}</th>
            <td>{st.secondName}</td>
            <td>{st.name}</td>
            <td>{st.thirdName || ''}</td>
            <td>{`${cathedras[groups[st.groupID].cathedraID].shortName} - ${getCurrentSemesterNumber(st.groupID)}${
              groups[st.groupID].number
            }`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminStudentTable;
