import React, { useEffect, useState } from 'react';

import { useSelector } from '../store/store';
import ais from '../store/ais/actions';

import AisAPI from '../services/ais';
import { SUCCESS } from '../store/loading/types';
import AdminStudentTable from '../components/AdminStudentTable';
import { shallowEqual } from 'react-redux';
import auth from '../store/auth/actions';

interface StudentWithUserInfo {
  studentID: number;
  userID?: number;
  roleID?: number;
}

const anyToStudentWithUserInfo = (obj: any): StudentWithUserInfo => ({
  studentID: obj['student_id'],
  userID: obj['user_id'],
  roleID: obj['role_id'],
});

const AdminCabinet: React.FC = () => {
  const token = useSelector((st) => st.auth.token);

  const aisState = useSelector(
    (st) => ({
      students: st.ais.student,
      groups: st.ais.group,
      cathedras: st.ais.cathedra,
      semesters: st.ais.semester,
    }),
    shallowEqual,
  );

  const [studentsWithUsers, setStudentsWithUsers] = useState<Array<StudentWithUserInfo>>([]);
  const [studentsWithUsersLoading, setStudentsWithUsersLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          const resp = await AisAPI.StudentRoles.withAuth('Bearer', token).Get();
          if (resp.status === 200) {
            const jsonedResp = await resp.json();
            setStudentsWithUsers(jsonedResp.map(anyToStudentWithUserInfo));
            setStudentsWithUsersLoading(false);
          } else {
            auth.logout();
          }
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [token]);

  useEffect(() => {
    ais.cathedra.fillAll();
    ais.student.fillAll();
    ais.group.fillAll();
    ais.semester.fillAll();
  }, []);

  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col">
            <div>Пользователи</div>
            {studentsWithUsersLoading ? (
              <div>loading</div>
            ) : (
              studentsWithUsers.map((st, i) => <div key={i}> {st.studentID}</div>)
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
      <div className="col-2">this slides out</div>
    </div>
  );
};

export default AdminCabinet;
