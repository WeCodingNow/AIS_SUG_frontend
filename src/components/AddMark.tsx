import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import ais from '../store/ais/actions';
import { useSelector } from '../store/store';
import { HashToArray } from '../store/types';
import { makeGroupName } from '../utils/funcs';

interface MarkData {
  value: string;
  studentID: string;
  controlEventID: string;
}

interface AddMarkProps {
  closeCallback: () => void;
}

const AddMark: React.FC<AddMarkProps> = ({ closeCallback }) => {
  // const [selectedControlEvent, setControlEventSelection] = useState<number | undefined>(undefined);
  const [selectedStudent, setStudentSelection] = useState<number | undefined>(undefined);

  const marks = useSelector((st) => st.ais.mark.byID);
  const groups = useSelector((st) => st.ais.group.byID);
  const semesters = useSelector((st) => st.ais.semester.byID);
  const cathedras = useSelector((st) => st.ais.cathedra.byID);
  const controlEvents = useSelector((st) => st.ais.controlEvent.byID);
  const controlEventTypes = useSelector((st) => st.ais.controlEventType.byID);
  const students = useSelector((st) => st.ais.student.byID);
  const disciplines = useSelector((st) => st.ais.discipline.byID);

  // const getCurrentSemesterNumber = makeCurrentSemesterGetter(groups, semesters);

  // makeGroupName;

  const { register, handleSubmit } = useForm<MarkData>({});

  const availableControlEvents = HashToArray(controlEvents).filter(
    (ce) =>
      selectedStudent === undefined ||
      ce.markIDs.map((m) => marks[m]).filter((m) => m.studentID === selectedStudent).length === 0,
  );

  const availableStudents = HashToArray(students);

  const onSubmit = async (data: MarkData) => {
    try {
      console.log(data);
      await ais.mark.create({
        value: +data.value,
        controlEventID: +data.controlEventID,
        studentID: +data.studentID,
        date: new Date(),
      });
      closeCallback();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="col-md-4">
          <label htmlFor="studentID">Студент</label>
          <select
            className="custom-select my-1 mr-sm-2"
            name="studentID"
            onChange={(e) => {
              setStudentSelection(+e.target.value);
            }}
            ref={register({ required: true })}
          >
            {availableStudents.map((st) => (
              <option key={st.id} value={st.id}>
                {`${st.secondName} ${st.name[0]}.${st.thirdName ? `${st.thirdName[0]}.` : ''} (${makeGroupName(
                  st.groupID,
                  groups,
                  semesters,
                  cathedras,
                )})`}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="controlEventID">Контрольное мероприятие</label>
          <select className="custom-select my-1 mr-sm-2" name="controlEventID" ref={register({ required: true })}>
            {availableControlEvents.map((ce) => (
              <option key={ce.id} value={ce.id}>
                {`${disciplines[ce.disciplineID].name}: ${ce.date}(${controlEventTypes[ce.typeID].def})`}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="value">Оценка</label>
          <input className="form-control" name="value" ref={register({ required: true })} />
        </div>
      </div>
      <div className="form-row">
        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
      </div>
    </form>
  );
};

export default AddMark;
