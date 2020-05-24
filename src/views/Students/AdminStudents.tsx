import React, { useEffect } from 'react';
import { shallowEqual } from 'react-redux';

import { useSelector } from '../../store/store';
import ais from '../../store/ais/actions';
import admin from '../../store/admin/actions';
import { SUCCESS } from '../../store/loading/types';

import AdminStudentTable from '../../components/AdminStudentTable';
import AdminUserTable from '../../components/AdminUserTable';

const AdminStudents: React.FC = () => {
  const aisState = useSelector(
    (st) => ({
      students: st.ais.student,
      groups: st.ais.group,
      cathedras: st.ais.cathedra,
      semesters: st.ais.semester,
      bindings: st.admin.studentBindings,
      roles: st.admin.roles,
    }),
    shallowEqual,
  );

  const tokenSet = useSelector((state) => state.auth.tokenSet);

  useEffect(() => {
    if (tokenSet) {
      ais.cathedra.fillAll();
      ais.student.fillAll();
      ais.group.fillAll();
      ais.semester.fillAll();
      admin.fillStudentBindings();
      admin.fillRoles();
    }
  }, [tokenSet]);

  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col">
            <div>Пользователи</div>
            {aisState.bindings?.loading === SUCCESS &&
            aisState.students.loading === SUCCESS &&
            aisState.roles.loading === SUCCESS ? (
              <AdminUserTable
                bindings={aisState.bindings.byID}
                students={aisState.students.byID}
                roles={aisState.roles.byID}
              />
            ) : (
              <div>LOADING</div>
            )}
            <div>Студенты</div>
            {aisState.students.loading === SUCCESS &&
            aisState.groups.loading === SUCCESS &&
            aisState.cathedras.loading === SUCCESS &&
            aisState.semesters.loading === SUCCESS ? (
              <AdminStudentTable
                students={aisState.students.byID}
                groups={aisState.groups.byID}
                cathedras={aisState.cathedras.byID}
                semesters={aisState.semesters.byID}
              />
            ) : (
              <div>loading</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
