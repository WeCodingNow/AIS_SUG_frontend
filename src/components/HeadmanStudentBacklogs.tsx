import React from 'react';
import { useSelector } from '../store/store';
// import { HashToArray } from '../store/types';

export const HeadmanStudentBacklogs: React.FC = () => {
  const viewState = useSelector((st) => st.view.headman.students);
  const selectedStudent = viewState.selection.student;
  const disciplines = useSelector((st) => st.ais.discipline.byID);
  const backlogs = useSelector((st) => st.ais.backlog.byID);
  const selectedDiscipline = viewState.selection.discipline;

  // const displayedDisciplines = HashToArray(disciplines)
  //   .filter((d) => d.semesters.filter((semID) => semID === viewState.selection.semester?.id ?? 0).length > 0)
  //   .sort((lhs, rhs) => (lhs.name[0] > rhs.name[0] ? 1 : lhs.name[0] === rhs.name[0] ? 0 : -1));

  const displayedBacklogs = (selectedStudent?.backlogIDs ?? [])
    .map((bid) => backlogs[bid])
    .filter((b) => (viewState.selection.discipline ? viewState.selection.discipline.id === b.disciplineID : true))
    .filter(
      (b) =>
        disciplines[b.disciplineID].semesters.filter((s) => (viewState.selection.semester?.id ?? 0) === s).length > 0,
    )
    .sort((lhs, rhs) =>
      disciplines[lhs.disciplineID].name < disciplines[rhs.disciplineID].name
        ? 1
        : disciplines[lhs.disciplineID].name === disciplines[rhs.disciplineID].name
        ? 0
        : -1,
    )
    .filter((b) => !b.done);

  return selectedStudent ? (
    <table className="table">
      <thead>
        <tr>
          {selectedDiscipline === undefined && <th scope="col">Дисциплина</th>}
          <th scope="col">Задолженность</th>
        </tr>
      </thead>
      <tbody>
        {displayedBacklogs.map((b) => (
          <tr key={b.id}>
            {selectedDiscipline === undefined && <th>{disciplines[b.disciplineID].name}</th>}
            <th>{b.desc}</th>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <></>
  );
};
