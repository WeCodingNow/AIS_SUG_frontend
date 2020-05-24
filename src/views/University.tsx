import React, { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';

import { useSelector } from '../store/store';
import { HashTable, HashToArray } from '../store/types';
import ais from '../store/ais/actions';
import { Discipline } from '../store/ais/discipline/types';
import { ControlEvent } from '../store/ais/control_event/types';
import { Mark } from '../store/ais/mark/types';

import { AvgMarkObj, DisciplinesTable } from '../components/DisciplinesTable';
import { MarksTable } from '../components/MarksTable';

import './styles/university.scss';

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
      <div className="row">Оценки</div>
      <div className="row">
        {selectedDisciplineID ? (
          <button type="button" className="btn btn-dark" onClick={() => setSelectedDisciplineID(undefined)}>
            Показать все
          </button>
        ) : (
          <></>
        )}
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
