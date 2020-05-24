import React from 'react';

import { HashToArray, HashTable } from '../store/types';
import { StudentBinding } from '../store/admin/types';
import { Role } from '../store/admin/types';
import PromoteUserButton from './PromoteUserButton';

interface PromoteUserButtonGroupProps {
  bindings: HashTable<StudentBinding>;
  roles: HashTable<Role>;
  studentID: number;
  userID: number;
}

const PromoteUserButtonGroup: React.FC<PromoteUserButtonGroupProps> = ({ bindings, roles, studentID, userID }) => (
  <div className="btn-group" role="group" aria-label="Basic example">
    {HashToArray(roles)
      .reverse()
      .filter((r) => r.id !== bindings[studentID].roleID)
      .map((r) => (
        <PromoteUserButton key={r.id} roles={roles} roleID={r.id} userID={userID} />
      ))}
  </div>
);

export default PromoteUserButtonGroup;
