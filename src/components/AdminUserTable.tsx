import React from 'react';

import { HashToArray, HashTable } from '../store/types';

import { Student } from '../store/ais/student/types';
import { StudentBinding } from '../store/admin/types';
import { Role } from '../store/admin/types';
import PromoteUserButtonGroup from './PromoteUserButtonGroup';
import { getStudentShortname } from '../utils/funcs';

interface AdminUserTableProps {
  bindings: HashTable<StudentBinding>;
  students: HashTable<Student>;
  roles: HashTable<Role>;
}

const AdminUserTable: React.FC<AdminUserTableProps> = ({ bindings, students, roles }) => {
  const studentBindings = HashToArray(bindings);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Студент</th>
          <th scope="col">Роль</th>
          <th scope="col">Повысить</th>
        </tr>
      </thead>
      <tbody>
        {studentBindings.map((stb) => (
          <tr key={stb.studentID}>
            <th scope="row">{getStudentShortname(students[stb.studentID])}</th>
            <td>{stb.roleID ? roles[stb.roleID].def : 'NA'}</td>
            <td>
              {stb.roleID ? (
                <PromoteUserButtonGroup
                  bindings={bindings}
                  roles={roles}
                  studentID={stb.studentID}
                  userID={stb.userID as number}
                />
              ) : (
                <></>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminUserTable;
