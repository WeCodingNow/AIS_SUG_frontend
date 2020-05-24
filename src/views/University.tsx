import React, { useEffect, useState } from 'react';

import ais from '../store/ais/actions';
import { useSelector } from '../store/store';
import { HashTable, HashToArray } from '../store/types';
import { Discipline } from '../store/ais/discipline/types';

import './styles/university.scss';
import { shallowEqual } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { ControlEvent } from '../store/ais/control_event/types';
import { Mark } from '../store/ais/mark/types';
import { SUCCESS } from '../store/loading/types';
// import { Mark } from '../store/ais/mark/types';

interface AvgMarkObj {
  [id: string]: number;
}

interface DisciplinesTableProps {
  disciplines: HashTable<Discipline>;
  averages: AvgMarkObj;
  selectedDisciplineID?: number;
  callback?: (discID?: number) => void;
}

export const DisciplinesTable: React.FC<DisciplinesTableProps> = ({
  disciplines,
  averages,
  selectedDisciplineID,
  callback,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Дисциплина</th>
          <th scope="col">Средний балл</th>
        </tr>
      </thead>
      <tbody>
        {HashToArray(disciplines).map((ind) => (
          <tr
            key={ind.id}
            className={selectedDisciplineID && ind.id === selectedDisciplineID ? 'selected-discipline' : ''}
          >
            <th
              scope="row"
              onClick={
                callback
                  ? () => {
                      callback(ind.id);
                    }
                  : undefined
              }
            >
              {ind.name}
            </th>
            <th>{(averages[ind.id] ?? 0).toString().slice(0, 4)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface MarksTableProps {
  marks: Array<Mark>;
  disciplineID?: number;
}

export const MarksTable: React.FC<MarksTableProps> = ({ marks, disciplineID }) => {
  const controlEvents = useSelector((s) => s.ais.controlEvent.byID);
  const disciplines = useSelector((s) => s.ais.discipline.byID);

  const ceTypes = useSelector((s) => s.ais.controlEventType);

  useEffect(() => {
    ais.controlEventType.fillAll();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Тип</th>
          <th scope="col">Оценка</th>
          <th scope="col">Дата получения</th>
          {disciplineID === undefined ? <th scope="col">Дисциплина</th> : <></>}
        </tr>
      </thead>
      <tbody>
        {marks.map((m) => (
          <tr key={m.id}>
            <th>
              {ceTypes.loading === SUCCESS
                ? ceTypes.byID[controlEvents[m.controlEventID].typeID].def
                : 'узнаём тип КМ...'}
            </th>
            <th scope="row">{m.value}</th>
            <th>{m.date}</th>
            {disciplineID === undefined ? (
              <th>{disciplines[controlEvents[m.controlEventID].disciplineID].name}</th>
            ) : (
              <></>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const University: React.FC = () => {
  const [selectedSemesterID, setSelectedSemesterID] = useState(0);
  const [selectedDisciplineID, setSelectedDisciplineID] = useState<number | undefined>(undefined);

  const me = useSelector((s) => s.me, shallowEqual);
  const state = useSelector(
    (s) => ({
      group: s.ais.group,
      semester: s.ais.semester,
      discipline: s.ais.discipline,
      controlEvent: s.ais.controlEvent,
      marks: s.ais.mark,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (me.info?.studentID && me.info?.groupID) {
      ais.student.fill(me.info?.studentID);
      ais.group.fill(me.info?.groupID);
    }
  }, [me.info]);

  useEffect(() => {
    ais.group.fillAll();
    ais.semester.fillAll();
    ais.discipline.fillAll();
    ais.controlEvent.fillAll();
    ais.mark.fillAll();
  }, []);

  const lastSemester = me?.info?.groupID
    ? HashToArray(state.semester.byID)
        .filter((sem) => sem.groupIDs.filter((grID) => grID === me?.info?.groupID))
        .sort((lhs, rhs) => (lhs.number > rhs.number ? -1 : lhs.number > rhs.number ? 1 : 0))[0]
    : undefined;

  useEffect(() => {
    if (lastSemester) {
      setSelectedSemesterID(lastSemester.id);
    }
  }, [lastSemester]);

  const disciplinesInSemester: HashTable<Discipline> = HashToArray(state.discipline.byID)
    .filter((d) => d.semesters.filter((sid) => sid === selectedSemesterID).length > 0)
    .reduce((obj, disp) => ({ ...obj, [disp.id]: disp }), {});

  interface ControlEventsToDisciplinesMapping {
    [disciplineID: number]: Array<ControlEvent>;
  }

  const selectedDisciplinesMarks = Object.entries(
    HashToArray(disciplinesInSemester)
      .flatMap((d) => d.controlEventIDs.map((ceID) => state.controlEvent.byID[ceID]))
      .reduce<ControlEventsToDisciplinesMapping>(
        (prevObj, ce) => ({ ...prevObj, [ce.disciplineID]: [...(prevObj[ce.disciplineID] ?? []), ce] }),
        {},
      ),
  )
    .map(([discID, controlEvents]: [string, Array<ControlEvent>]) => ({
      [discID]: controlEvents.flatMap((ce) => {
        return ce.markIDs.map((mid) => state.marks.byID[mid]).filter((m) => m.studentID === (me.info?.studentID ?? 0));
      }),
    }))
    .reduce((prevObj, nextObj) => ({ ...prevObj, ...nextObj }), {});

  const filteredDisciplineMarks = selectedDisciplineID
    ? { [selectedDisciplineID]: selectedDisciplinesMarks[selectedDisciplineID] }
    : selectedDisciplinesMarks;

  const selectedAverageScores: AvgMarkObj = Object.entries(selectedDisciplinesMarks)
    .map(([discID, marks]: [string, Array<Mark>]) => {
      return { [discID]: marks.reduce((prevSum, m) => prevSum + m.value, 0) / marks.length };
    })
    .reduce((prevObj, mAvg) => ({ ...prevObj, ...mAvg }), {});

  return (
    <div className="university-view container fluid">
      <div className="row justify-content-center">
        <div className="col-6 align-self-center header">
          <div className="text">Университет</div>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-push-4">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {state.semester.byID[selectedSemesterID]
                ? `Семестр ${state.semester.byID[selectedSemesterID].number}`
                : ''}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {HashToArray(state.semester.byID).map((sem) => (
                <Dropdown.Item
                  key={sem.id}
                  onClick={() => {
                    setSelectedDisciplineID(undefined);
                    setSelectedSemesterID(sem.id);
                  }}
                >
                  Семестр {`${sem.number}`}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="row">
        {disciplinesInSemester ? (
          <DisciplinesTable
            averages={selectedAverageScores}
            disciplines={disciplinesInSemester}
            callback={(discID) => setSelectedDisciplineID(discID)}
            selectedDisciplineID={selectedDisciplineID}
          />
        ) : (
          <div>loading disciplines</div>
        )}
      </div>
      <div className="row">
        Оценки
        <span>
          {selectedDisciplineID ? (
            <button onClick={() => setSelectedDisciplineID(undefined)}>Показать все</button>
          ) : (
            <></>
          )}
        </span>
      </div>
      <div className="row">
        <MarksTable
          marks={Object.values(filteredDisciplineMarks)
            .flatMap((marks) => marks)
            .filter((m) => m)}
          disciplineID={selectedDisciplineID}
        />
      </div>
    </div>
  );
};

export default University;
