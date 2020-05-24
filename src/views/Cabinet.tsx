import React from 'react';

import { useSelector } from '../store/store';

import AdminCabinet from './Cabinet/AdminCabinet';
import HeadmanCabinet from './Cabinet/HeadmanCabinet';
import StudentCabinet from './Cabinet/StudentCabinet';

import { RoleViewsType } from '../roles';

import './styles/cabinet.scss';

const roleViews: RoleViewsType = {
  1: <AdminCabinet />,
  2: <HeadmanCabinet />,
  3: <StudentCabinet />,
};

const Cabinet: React.FC = () => {
  const role = useSelector((st) => st.role.role);

  return (
    <div className="cabinet-view container fluid">
      <div className="row justify-content-center">
        <div className="col-6 align-self-center header">
          <div className="text">Личный кабинет</div>
        </div>
      </div>
      {role ? roleViews[role.id] || <div>cabinet (no cabinet for role)</div> : <div>cabinet (no role)</div>}
    </div>
  );
};

export default Cabinet;
