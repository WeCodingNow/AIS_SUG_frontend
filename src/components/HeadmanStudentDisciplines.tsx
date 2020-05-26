import React from 'react';

import { useSelector } from '../store/store';
import { HashToArray } from '../store/types';
import { Mark } from '../store/ais/mark/types';
import view from '../store/views/headman/actions';

// import view from '../store/views/headman/actions';

interface MarksByDiscipline {
  [x: number]: Array<Mark>;
}

interface AverageMarks {
  [x: number]: number;
}

export const HeadmanStudentDiscipline: React.FC = () => {
  const viewState = useSelector((st) => st.view.headman);
  const selectedStudent = viewState.students.selection.student;
  const disciplines = useSelector((st) => st.ais.discipline.byID);
  const marks = useSelector((st) => st.ais.mark.byID);
  const controlEvents = useSelector((st) => st.ais.controlEvent.byID);

  const displayedDisciplines = HashToArray(disciplines)
    .filter((d) => d.semesters.filter((semID) => semID === viewState.students.selection.semester?.id ?? 0).length > 0)
    .sort((lhs, rhs) => (lhs.name[0] > rhs.name[0] ? 1 : lhs.name[0] === rhs.name[0] ? 0 : -1));

  // const displayedMarks = (selectedStudent?.markIDs.map((mID) => marks[mID]) ?? []).filter((m) =>
  //   viewState.students.selection.discipline
  //     ? controlEvents[m.controlEventID].disciplineID === viewState.students.selection.discipline?.id
  //     : true,
  // );

  const marksByDiscipline = (selectedStudent?.markIDs.map((mID) => marks[mID]) ?? []).reduce<MarksByDiscipline>(
    (prevObj, mark) => ({
      ...prevObj,
      [controlEvents[mark.controlEventID].disciplineID]: [
        ...(prevObj[controlEvents[mark.controlEventID].disciplineID] ?? []),
        mark,
      ],
    }),
    {},
  );

  const averageMarks = Object.entries(marksByDiscipline).reduce<AverageMarks>(
    (prevObj, [k, v]) => ({ ...prevObj, [k]: v.reduce((sum: number, m: Mark) => sum + m.value, 0) / v.length }),
    {},
  );

  return selectedStudent ? (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Дисциплина</th>
          <th scope="col">Средняя оценка</th>
        </tr>
      </thead>
      <tbody>
        {displayedDisciplines.map((d) => (
          <tr
            className={
              viewState.students.selection.discipline && viewState.students.selection.discipline.id === d.id
                ? 'selected-discipline'
                : ''
            }
            key={d.id}
            onClick={() => {
              view.selectStudentDiscipline(d);
            }}
          >
            <td>{d.name}</td>
            <td>{averageMarks[d.id] ?? 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <></>
  );
};
