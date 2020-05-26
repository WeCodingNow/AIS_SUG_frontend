import React from 'react';
import { shallowEqual } from 'react-redux';

import { useSelector } from '../store/store';
import view from '../store/views/headman/actions';

import { SUCCESS } from '../store/loading/types';
import { Residence } from '../store/ais/residence/types';
import { Contact } from '../store/ais/contact/types';

export const HeadmanStudentTable: React.FC = () => {
  const viewState = useSelector((st) => st.view.headman);
  const students = useSelector((st) => st.ais.student.byID, shallowEqual);
  const residences = useSelector((st) => st.ais.residence.byID, shallowEqual);
  const contacts = useSelector((st) => st.ais.contact.byID, shallowEqual);
  const contactTypes = useSelector((st) => st.ais.contactType.byID, shallowEqual);

  const groupStudents = viewState.own.group?.studentIDs.map((stID) => students[stID]) ?? [];

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя</th>
          <th scope="col">Отчество</th>
          <th scope="col">Место жительства</th>
          <th scope="col">Связь</th>
        </tr>
      </thead>
      <tbody>
        {viewState.own.loading === SUCCESS ? (
          groupStudents
            .filter((st) => (viewState.filters.isInCommunity ? residences[st.residenceID].community : true))
            .filter((st) => (viewState.filters.isMoscowite ? residences[st.residenceID].city === 'Москва' : true))
            .sort((lhs, rhs) => (lhs.name[0] > rhs.name[0] ? 1 : lhs.name[0] === rhs.name[0] ? 0 : -1))
            .map((st) => (
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
                <td>
                  {st.contactIDs
                    .sort((lhs, rhs) =>
                      contacts[lhs].typeID > contacts[rhs].typeID
                        ? 1
                        : contacts[lhs].typeID === contacts[rhs].typeID
                        ? 0
                        : -1,
                    )
                    .map((cID) => (
                      <div key={cID}>
                        {((contact: Contact) => `${contactTypes[contact.id].def}: ${contact.def}`)(contacts[cID])}
                      </div>
                    ))}
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
