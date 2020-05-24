import React from 'react';

import { HashTable } from '../store/types';
import admin from '../store/admin/actions';

import { Role } from '../store/admin/types';

interface PromoteUserButtonProps {
  roles: HashTable<Role>;
  userID: number;
  roleID: number;
}

const PromoteUserButton: React.FC<PromoteUserButtonProps> = ({ roles, userID, roleID }) => {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => {
        admin.promoteUser(userID, roleID);
      }}
    >
      {roles[roleID].def}
    </button>
  );
};

export default PromoteUserButton;
