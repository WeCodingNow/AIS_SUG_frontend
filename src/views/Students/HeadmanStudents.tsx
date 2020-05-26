import React, { useEffect } from 'react';
import { shallowEqual } from 'react-redux';

import { useSelector } from '../../store/store';
import { SUCCESS } from '../../store/loading/types';
// import { HashToArray } from '../../store/types';
import view from '../../store/views/headman/actions';

import { HeadmanStudentTable } from '../../components/HeadmanStudentTable';
import { FilterBlock } from '../../components/FilterBlock';
import { SemesterChoice } from '../../components/SemesterChoice';
import { HeadmanStudentMarks } from '../../components/HeadmanStudentMarks';
import { HeadmanStudentBacklogs } from '../../components/HeadmanStudentBacklogs';
import { HeadmanStudentDiscipline } from '../../components/HeadmanStudentDisciplines';

const HeadmanStudents: React.FC = () => {
  const viewState = useSelector((st) => st.view.headman.students);

  const authed = useSelector((st) => st.auth.tokenSet, shallowEqual);
  const loadingInfo = useSelector((st) => st.view.headman.students.own.loading);
  const selectedDiscipline = useSelector((st) => st.view.headman.students.selection.discipline);

  // const disciplines = useSelector((st) => st.ais.discipline.byID);

  const semesters = useSelector((st) => st.ais.semester.byID, shallowEqual);
  const cathedras = useSelector((st) => st.ais.cathedra.byID, shallowEqual);

  const myGroup = useSelector((st) => st.view.headman.students.own.group);

  const mySemesters =
    (myGroup?.semesterIDs ?? [])
      .map((semID) => semesters[semID])
      .sort((lhs, rhs) => (lhs.number < rhs.number ? 1 : lhs.number === rhs.number ? 0 : -1)) ?? [];

  const lastSemester = mySemesters[0];

  useEffect(() => {
    if (authed) {
      view.loadOwnGroup();
    }
  }, [authed]);

  useEffect(() => {
    if (lastSemester) {
      view.putSelectedSemester(lastSemester);
    }
  }, [lastSemester]);

  // const displayedDisciplines = HashToArray(disciplines)
  //   .filter((d) => d.semesters.filter((semID) => semID === viewState.selection.semester?.id ?? 0).length > 0)
  //   .sort((lhs, rhs) => (lhs.name[0] > rhs.name[0] ? 1 : lhs.name[0] === rhs.name[0] ? 0 : -1));

  // const disciplinesInSemester = viewState.selection.semester
  //   ? semesters[viewState.selection.semester.id].disciplineIDs.map((dID) => disciplines[dID])
  //   : [];

  // const selectedMarks = (viewState.selection.student?.markIDs ?? []).filter(())

  return (
    <div className="row">
      {loadingInfo === SUCCESS && (
        <div className="col">
          <div className="row">
            {`Группа ${cathedras[myGroup?.cathedraID ?? 0].shortName}-${lastSemester?.number ?? 0}${
              myGroup?.number ?? 0
            }`}
          </div>
          <div className="row">
            <FilterBlock />
          </div>
          <div className="row">
            <HeadmanStudentTable />
          </div>
          <div className="row">
            <SemesterChoice
              selectedSemester={viewState.selection.semester}
              semesters={mySemesters}
              callback={(sem) => {
                view.putSelectedSemester(sem);
                view.deselectStudentDiscipline();
              }}
            />
            {selectedDiscipline ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  view.deselectStudentDiscipline();
                }}
              >
                показать все
              </button>
            ) : (
              <></>
            )}
            {/* <HeadmanStudentDiscipline marks={myMarks} displayedDisciplines={disciplinesInSemester} /> */}
            <HeadmanStudentDiscipline />
          </div>
          <div className="row">
            <HeadmanStudentMarks />
          </div>
          <div className="row">
            <HeadmanStudentBacklogs />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadmanStudents;
