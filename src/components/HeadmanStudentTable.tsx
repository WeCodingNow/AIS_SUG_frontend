import React from 'react';
import { shallowEqual } from 'react-redux';

import { useSelector } from '../store/store';
import view from '../store/views/headman/actions';

import { SUCCESS } from '../store/loading/types';
import { Residence } from '../store/ais/residence/types';

// import { HashToArray } from '../store/types';

export const HeadmanStudentTable: React.FC = () => {
  const viewState = useSelector((st) => st.view.headman);
  const students = useSelector((st) => st.ais.student.byID, shallowEqual);
  const residences = useSelector((st) => st.ais.residence.byID, shallowEqual);

  const groupStudents = viewState.own.group?.studentIDs.map((stID) => students[stID]) ?? [];

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя</th>
          <th scope="col">Отчество</th>
          <th scope="col">Место жительства</th>
        </tr>
      </thead>
      <tbody>
        {viewState.own.loading === SUCCESS ? (
          groupStudents.map((st) => (
            <tr
              key={st.id}
              onClick={() => {
                view.selectStudent(st.id);
              }}
              className={viewState.selection.student?.id === st.id ? 'selected-student' : ''}
            >
              <td>{st.secondName}</td>
              <td>{st.name}</td>
              <td>{st.thirdName || ''}</td>
              <td>
                {((residence: Residence) => `${residence.address}, г.${residence.city}`)(residences[st.residenceID])}
              </td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
};
