// import React, { useEffect } from 'react';
import React from 'react';
// import { useSelector } from '../store/store';
// import { shallowEqual } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';

// import view from '../store/views/headman/actions';
import { Semester } from '../store/ais/semester/types';

interface SemesterChoiceProps {
  selectedSemester?: Semester;
  semesters: Array<Semester>;
  callback: (sem: Semester) => void;
}

export const SemesterChoice: React.FC<SemesterChoiceProps> = ({ selectedSemester, semesters, callback }) => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {selectedSemester ? `Семестр ${selectedSemester.number}` : ''}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {semesters.map((sem) => (
            <Dropdown.Item
              key={sem.id}
              onClick={() => {
                callback(sem);
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
