import React from 'react';

import { HashTable, HashToArray } from '../../store/types';
import { Student } from '../../store/ais/student/types';
import { useSelector } from '../../store/store';

interface StudentTableProps {
  students: HashTable<Student>;
}

const HeadmanStudentTable: React.FC<StudentTableProps> = ({ students }: StudentTableProps) => {
  const studentsMap = HashToArray(students);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя</th>
          <th scope="col">Отчество</th>
        </tr>
      </thead>
      <tbody>
        {studentsMap.map((st) => (
          <tr key={st.id}>
            <th scope="row">{st.id}</th>
            <td>{st.secondName}</td>
            <td>{st.name}</td>
            <td>{st.thirdName || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const HeadmanCabinet: React.FC = () => {
  const students = useSelector((st) => st.ais.student.byID);

  return (
    <div className="row">
      <div className="col">
        <HeadmanStudentTable students={students} />
      </div>
      <div className="col">right col</div>
    </div>
  );
};

export default HeadmanCabinet;
