import React, { useEffect } from 'react';
import { shallowEqual } from 'react-redux';

import { useSelector } from '../../store/store';
import { SUCCESS } from '../../store/loading/types';
import { HashToArray } from '../../store/types';
import view from '../../store/views/headman/actions';

import { HeadmanStudentTable } from '../../components/HeadmanStudentTable';
import { FilterBlock } from '../../components/FilterBlock';
import { HeadmanStudentDiscipline } from '../../components/HeadmanStudentDisciplines';
import { SemesterChoice } from '../../components/SemesterChoice';
import { HeadmanStudentMarks } from '../../components/HeadmanStudentMarks';

const HeadmanStudents: React.FC = () => {
  const authed = useSelector((st) => st.auth.tokenSet, shallowEqual);
  const loadingInfo = useSelector((st) => st.view.headman.own.loading);
  const selectedDiscipline = useSelector((st) => st.view.headman.selection.discipline);

  const myGroup = useSelector((st) => st.view.headman.own.group);
  const semesters = useSelector((st) => st.ais.semester, shallowEqual);
  const cathedras = useSelector((st) => st.ais.cathedra, shallowEqual);

  const lastSemester = myGroup?.id
    ? HashToArray(semesters.byID)
        .filter((sem) => sem.groupIDs.filter((grID) => grID === myGroup.id))
        .sort((lhs, rhs) => (lhs.number > rhs.number ? -1 : lhs.number > rhs.number ? 1 : 0))[0]
    : undefined;

  useEffect(() => {
    if (authed) {
      view.loadOwnGroup();
    }
  }, [authed]);

  return (
    <div className="row">
      {loadingInfo !== SUCCESS ? (
        <></>
      ) : (
        <div className="col">
          <div className="row">
            Группа{' '}
            {`${cathedras.byID[myGroup?.cathedraID ?? 0].shortName}-${lastSemester?.number ?? 0}${
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
            <SemesterChoice />
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
            <HeadmanStudentDiscipline />
          </div>
          <div className="row">
            <HeadmanStudentMarks />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadmanStudents;
