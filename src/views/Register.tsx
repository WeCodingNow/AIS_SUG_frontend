import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useSelector } from '../store/store';
import './styles/register.scss';
import { HashToArray } from '../store/ais/types';

import ais from '../store/ais/actions';
import { SUCCESS } from '../store/loading/types';

interface RegisterData {
  username: string;
  password: string;
  firstName: string;
  secondName: string;
  thirdName?: string;
  groupID: number;
}

const validationRegexp = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.compile();
const checkIsEmail = (email: string) => (email.match(validationRegexp) && true) || false;

const GroupsOptions: React.FC = () => {
  const groups = useSelector((s) => s.ais.group);
  const semesters = useSelector((s) => s.ais.semester);
  const cathedras = useSelector((s) => s.ais.cathedra);
  const groupsArray = HashToArray(groups.byID);

  const getMaxSemesterNumber = (groupID: number) =>
    groups.byID[groupID].semesterIDs
      .map((semID) => semesters.byID[semID].number)
      .reduce((prevSemN, curSemN) => (prevSemN > curSemN ? prevSemN : curSemN));

  return (
    <>
      {groupsArray.map((g) => (
        <option key={g.id} value={g.id}>
          {`${cathedras.byID[g.cathedraID].shortName}-${getMaxSemesterNumber(g.id)}${g.number}`}
        </option>
      ))}
    </>
  );
};

const RegistrationForm: React.FC = () => {
  const form = useForm<RegisterData>({ reValidateMode: 'onSubmit', validateCriteriaMode: 'all' });
  const { register, handleSubmit, errors } = form;
  const onSubmit = (data: RegisterData) => console.log(data);

  useEffect(() => {
    console.log('getting this shit');
    ais.group.fillAll();
    ais.cathedra.fillAll();
    ais.semester.fillAll();
  }, []);

  const groups = useSelector((s) => s.ais.group);
  const semesters = useSelector((s) => s.ais.semester);
  const cathedras = useSelector((s) => s.ais.cathedra);

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="input-name">Фамилия</label>
          <input className="form-control" name="secondName" ref={register({ required: true })} />
          {errors.secondName && <div className="invalid-feedback">Введите фамилию</div>}
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="input-name">Имя</label>
          <input className="form-control" name="firstName" ref={register({ required: true })} />
          {errors.firstName && <div className="invalid-feedback">Введите имя</div>}
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="input-name">Отчетство</label>
          <input className="form-control" name="thirdName" ref={register({ required: true })} />
          {errors.firstName && <div className="invalid-feedback">Введите отчество</div>}
        </div>
      </div>
      <div className="form-row">
        <div className="col">
          <label htmlFor="input-name">Группа</label>
          {(groups.loading === SUCCESS && semesters.loading === SUCCESS && cathedras.loading === SUCCESS && (
            <select className="custom-select my-1 mr-sm-2" name="group-id" ref={register()}>
              <GroupsOptions />
            </select>
          )) || <span>LOADING</span>}

          {errors.firstName && <div className="invalid-feedback">Выберите группу</div>}
        </div>
      </div>
      <div className="form-row">
        <div className="col-md-6 mb-3">
          <label htmlFor="input-name">Логин</label>
          <input className="form-control" name="username" ref={register({ required: true, validate: checkIsEmail })} />
          {errors.firstName && <div className="invalid-feedback">Введите e-mail</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="input-name">Пароль</label>
          <input
            className="form-control"
            name="password"
            ref={register({ required: true, minLength: 8, maxLength: 20 })}
          />
          <small id="passwordHelpInline" className="text-muted">
            8-20 символов
          </small>
          {errors.firstName && <div className="invalid-feedback">Введите пароль</div>}
        </div>
      </div>
      <div className="form-row">
        <button type="submit" className="btn btn-primary">
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};

const Registration: React.FC = () => {
  return (
    <div className="container-fluid register-view">
      <div className="row justify-content-center">
        <div className="col-6 align-self-center header">
          <div className="text">Регистрация</div>
        </div>
      </div>
      <div className="row content">
        <div className="col-md-6 offset-md-2">
          <RegistrationForm />
        </div>
        <div className="col">
          <div>тут вставляем фотку студента</div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
