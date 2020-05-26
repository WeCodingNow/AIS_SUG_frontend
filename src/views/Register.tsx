/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSelector, useThunkDispatch } from '../store/store';
import { HashToArray, HashTable } from '../store/types';

import { SUCCESS } from '../store/loading/types';
import ais from '../store/ais/actions';

import AisAPI from '../services/ais';
import auth from '../store/auth/actions';

// import { createResidence } from '../store/ais/residence/thunks';

import './styles/register.scss';
import { makeCurrentSemesterGetter } from '../utils/funcs';
import { Group } from '../store/ais/group/types';
import { Semester } from '../store/ais/semester/types';
import { Cathedra } from '../store/ais/cathedra/types';
import { shallowEqual } from 'react-redux';
import { createResidence } from '../store/ais/residence/thunks';

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

interface RegisterData {
  username: string;
  password: string;
  firstName: string;
  secondName: string;
  thirdName?: string;
  groupID: string;
  residenceID: string;

  newResidence: {
    city: string;
    address: string;
  };
}

const validationRegexp = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.compile();
const checkIsEmail = (email: string) => (email.match(validationRegexp) && true) || false;

// const dispatch = useDddis

const RegistrationForm: React.FC = () => {
  const form = useForm<RegisterData>({ reValidateMode: 'onSubmit', validateCriteriaMode: 'all' });
  const { register, handleSubmit, errors } = form;

  const [isInCommunity, setIsInCommunity] = useState(true);

  const dispatch = useThunkDispatch();
  // const dispatch = useDispatch();

  useEffect(() => {
    ais.group.fillAll();
    ais.cathedra.fillAll();
    ais.semester.fillAll();
    ais.residence.fillAll();
  }, []);

  const { groups, semesters, cathedras, residences } = useSelector(
    (s) => ({ groups: s.ais.group, semesters: s.ais.semester, cathedras: s.ais.cathedra, residences: s.ais.residence }),
    shallowEqual,
  );

  const communityResidences = HashToArray(residences.byID).filter((res) => res.community);

  const onSubmit = async (data: RegisterData) => {
    // const groupID
    if (!isInCommunity) {
      const newResidence = await dispatch(createResidence({ ...data.newResidence, community: false, studentIDs: [] }));

      data.residenceID = newResidence.id.toString();
    }

    const resp = await AisAPI.Register.Post({
      username: data.username,
      password: data.password,
      first_name: data.firstName,
      second_name: data.secondName,
      third_name: data.thirdName,
      group_id: +data.groupID,
      residence_id: +data.residenceID,
    });

    if (resp.status === 200) {
      auth.login(data.username, data.password);
    }
  };

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
            <select className="custom-select my-1 mr-sm-2" name="groupID" ref={register()}>
              <GroupsOptions groups={groups.byID} cathedras={cathedras.byID} semesters={semesters.byID} />
            </select>
          )) || <span>LOADING</span>}

          {errors.firstName && <div className="invalid-feedback">Выберите группу</div>}
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="">Вы живёте в общежитии?</label>
        <input
          type="checkbox"
          className="form-control"
          checked={isInCommunity}
          readOnly
          onClick={() => {
            setIsInCommunity(!isInCommunity);
          }}
        ></input>
      </div>

      {isInCommunity ? (
        <div className="form-row">
          <select className="custom-select my-1 mr-sm-2" name="residenceID" ref={register()}>
            {communityResidences.map((res) => (
              <option key={res.id} value={res.id}>{`${res.address}, г.${res.city}`}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="newResidence.address">Адрес</label>
            <input className="form-control" name="newResidence.address" ref={register({ required: true })} />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="newResidence.city">Город</label>
            <input className="form-control" name="newResidence.city" ref={register({ required: true })} />
          </div>
        </div>
      )}

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
      <div className="row justify-content-center content">
        <div className="col-md-6">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Registration;
