import React from 'react';

import { useSelector } from '../store/store';
// import { HashToArray } from '../store/types';

export const HeadmanStudentMarks: React.FC = () => {
  const viewState = useSelector((st) => st.view.headman);

  const disciplines = useSelector((st) => st.ais.discipline.byID);
  const marks = useSelector((st) => st.ais.mark.byID);
  const controlEvents = useSelector((st) => st.ais.controlEvent.byID);
  const controlEventTypes = useSelector((s) => s.ais.controlEventType.byID);

  const selectedStudent = viewState.selection.student;
  const selectedDiscipline = viewState.selection.discipline;

  const displayedMarks = (selectedStudent?.markIDs ?? [])
    .map((mid) => marks[mid])
    .filter((m) => {
      return controlEvents[m.controlEventID].semesterID === (viewState.selection.semester?.id ?? 0);
    })
    .sort((lhs, rhs) => (lhs.date < rhs.date ? 1 : lhs.date === rhs.date ? 0 : -1))
    .filter(
      (m) => selectedDiscipline === undefined || controlEvents[m.controlEventID].disciplineID === selectedDiscipline.id,
    );

  // console.log(displayedMarks);

  return selectedStudent ? (
    <table className="table">
      <thead>
        <tr>
          {selectedDiscipline === undefined && <th scope="col">Дисциплина</th>}
          <th>Тип</th>
          <th>Оценка</th>
          <th>Дата получения</th>
        </tr>
      </thead>
      <tbody>
        {displayedMarks.map((m) => (
          <tr key={m.id}>
            {selectedDiscipline === undefined && (
              <th>{disciplines[controlEvents[m.controlEventID].disciplineID].name}</th>
            )}
            <th>{controlEventTypes[controlEvents[m.controlEventID].typeID].def}</th>
            <th>{m.value}</th>
            <th>{m.date}</th>
          </tr>
        ))}
        {/* <tr></tr> */}
      </tbody>
    </table>
  ) : (
    <></>
  );
};
