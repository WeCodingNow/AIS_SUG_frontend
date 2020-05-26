import React from 'react';
import { useForm } from 'react-hook-form';

import ais from '../store/ais/actions';
import { useSelector } from '../store/store';
import { HashTable, HashToArray } from '../store/types';
import { Group } from '../store/ais/group/types';
import { Cathedra } from '../store/ais/cathedra/types';
import { Semester } from '../store/ais/semester/types';
import { makeCurrentSemesterGetter } from '../utils/funcs';
import { SUCCESS } from '../store/loading/types';

interface StudentData {
  name: string;
  secondName: string;
  thirdName?: string;

  residenceID: string;
  groupID: string;
}

interface AddStudentProps {
  closeCallback: () => void;
}

interface GroupsOptionsProps {
  groups: HashTable<Group>;
  cathedras: HashTable<Cathedra>;
  semesters: HashTable<Semester>;
}

const GroupsOptions: React.FC<GroupsOptionsProps> = ({ groups, cathedras, semesters }: GroupsOptionsProps) => {
  const groupsArray = HashToArray(groups);
  const getCurrentSemesterNumber = makeCurrentSemesterGetter(groups, semesters);

  return (
    <>
      {groupsArray.map((g) => (
        <option key={g.id} value={g.id}>
          {`${cathedras[g.cathedraID].shortName}-${getCurrentSemesterNumber(g.id)}${g.number}`}
        </option>
      ))}
    </>
  );
};

const AddStudent: React.FC<AddStudentProps> = ({ closeCallback }) => {
  const { register, handleSubmit } = useForm<StudentData>({});

  const groups = useSelector((st) => st.ais.group);
  const semesters = useSelector((st) => st.ais.semester);
  const cathedras = useSelector((st) => st.ais.cathedra);
  const residences = useSelector((st) => st.ais.residence);

  const availableResidences = HashToArray(residences.byID).filter(
    (res) => res.community || res.studentIDs.length === 0,
  );

  const onSubmit = async (data: StudentData) => {
    try {
      console.log(data);
      await ais.student.create({
        groupID: +data.groupID,
        name: data.name,
        secondName: data.secondName,
        thirdName: data.thirdName,
        residenceID: +data.residenceID,
        backlogIDs: [],
        contactIDs: [],
        markIDs: [],
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
          <label htmlFor="city">Имя</label>
          <input className="form-control" name="name" ref={register({ required: true })} />
        </div>
        <div className="col-md-4">
          <label htmlFor="address">Фамилия</label>
          <input className="form-control" name="secondName" ref={register({ required: true })} />
        </div>
        <div className="col-md-4">
          <label htmlFor="address">Отчетство</label>
          <input className="form-control" name="thirdName" ref={register()} />
        </div>
      </div>
      <div className="form-row">
        <div className="col">
          <label htmlFor="input-name">Группа</label>
          {(groups.loading === SUCCESS && semesters.loading === SUCCESS && cathedras.loading === SUCCESS && (
            <select className="custom-select my-1 mr-sm-2" name="groupID" ref={register()}>
              <GroupsOptions groups={groups.byID} cathedras={cathedras.byID} semesters={semesters.byID} />
            </select>
          )) || <span>LOADING</span>}
        </div>
        <div className="col-md-4">
          <label htmlFor="city">Место жительства</label>
          <select className="custom-select my-1 mr-sm-2" name="residenceID" ref={register()}>
            {availableResidences.map((r) => (
              <option key={r.id} value={r.id}>{`${r.address}, г.${r.city}`}</option>
            ))}
          </select>
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

export default AddStudent;
