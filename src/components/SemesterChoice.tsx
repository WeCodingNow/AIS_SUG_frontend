import React, { useEffect } from 'react';
import { useSelector } from '../store/store';
import { shallowEqual } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';

import view from '../store/views/headman/actions';

export const SemesterChoice: React.FC = () => {
  const viewState = useSelector((st) => st.view.headman.selection);
  const myGroup = useSelector((st) => st.view.headman.own.group);
  const semesters = useSelector((st) => st.ais.semester.byID, shallowEqual);

  const mySemesters = (myGroup?.semesterIDs ?? [])
    .map((grID) => semesters[grID])
    .sort((lhs, rhs) => (lhs.number < rhs.number ? 1 : lhs.number === rhs.number ? 0 : -1));

  useEffect(() => {
    view.putSelectedSemester(mySemesters[0]);
  }, []);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {viewState.semester ? `Семестр ${viewState.semester.number}` : ''}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {mySemesters.map((sem) => (
            <Dropdown.Item
              key={sem.id}
              onClick={() => {
                view.putSelectedSemester(sem);
                view.deselectStudentDiscipline();
              }}
            >
              Семестр {`${sem.number}`}
            </Dropdown.Item>
          ))}
          {/* ))} */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
