import React from 'react';

import { useSelector } from '../store/store';

import AdminStudents from './Students/AdminStudents';
import HeadmanStudents from './Students/HeadmanStudents';

import { RoleViewsType } from '../roles';

import './styles/students.scss';

const roleViews: RoleViewsType = {
  1: <AdminStudents />,
  2: <HeadmanStudents />,
};

const Students: React.FC = () => {
  const role = useSelector((st) => st.me.role);

  return (
    <div className="students-view container fluid">
      <div className="row justify-content-center">
        <div className="col-6 align-self-center header">
          <div className="text">Студенты</div>
        </div>
      </div>
      {role ? roleViews[role.id] || <div>cabinet (no cabinet for role)</div> : <div>cabinet (no role)</div>}
    </div>
  );
};

export default Students;
