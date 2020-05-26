import React, { useEffect } from 'react';

import './styles/university.scss';

import view from '../store/views/student/actions';
import { useSelector } from '../store/store';
import { shallowEqual } from 'react-redux';
import { SemesterChoice } from '../components/SemesterChoice';
import { SUCCESS } from '../store/loading/types';

const University: React.FC = () => {
  const authed = useSelector((st) => st.auth.tokenSet, shallowEqual);
  const viewState = useSelector((st) => st.view.student.university);

  const groups = useSelector((st) => st.ais.group.byID, shallowEqual);
  const semesters = useSelector((st) => st.ais.semester.byID, shallowEqual);

  useEffect(() => {
    if (authed) {
      view.loadOwnStudent();
    }
  }, [authed]);

  const myGroup = groups[viewState.own.student?.groupID ?? 0];

  const mySemesters =
    myGroup?.semesterIDs
      .map((semID) => semesters[semID])
      .sort((lhs, rhs) => (lhs.number < rhs.number ? 1 : lhs.number === rhs.number ? 0 : -1)) ?? [];

  const lastSemester = mySemesters[0];

  useEffect(() => {
    if (lastSemester) {
      view.putSelectedSemester(lastSemester);
    }
  }, [lastSemester]);

  return (
    <div className="university-view container fluid">
      <div className="row justify-content-center">
        <div className="col-6 align-self-center header">
          <div className="text">Университет</div>
        </div>
      </div>
      {viewState.own.loading === SUCCESS ? (
        <div className="col">
          <div className="row">
            <SemesterChoice
              semesters={mySemesters}
              selectedSemester={viewState.selection.semester}
              callback={(sem) => {
                view.deselectStudentDiscipline();
                view.putSelectedSemester(sem);
              }}
            />
          </div>
        </div>
      ) : (
        <div>Загружается информация об успеваемости...</div>
      )}
      <div className="row"></div>
    </div>
  );
};

export default University;
