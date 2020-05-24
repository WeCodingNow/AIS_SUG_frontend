import React from 'react';

import { HashTable, HashToArray } from '../store/types';
import { Student } from '../store/ais/student/types';

interface StudentTableProps {
  students: HashTable<Student>;
}

export const HeadmanStudentTable: React.FC<StudentTableProps> = ({ students }: StudentTableProps) => {
  const studentsMap = HashToArray(students);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя</th>
          <th scope="col">Отчество</th>
        </tr>
      </thead>
      <tbody>
        {studentsMap.map((st) => (
          <tr key={st.id}>
            <td>{st.secondName}</td>
            <td>{st.name}</td>
            <td>{st.thirdName || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
