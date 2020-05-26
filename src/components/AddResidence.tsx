import React from 'react';
import { useForm } from 'react-hook-form';

import ais from '../store/ais/actions';

interface ResidenceData {
  city: string;
  address: string;
  community: boolean;
}

interface AddResidenceProps {
  closeCallback: () => void;
}

const AddResidence: React.FC<AddResidenceProps> = ({ closeCallback }) => {
  const { register, handleSubmit } = useForm<ResidenceData>({});

  const onSubmit = async (data: ResidenceData) => {
    try {
      await ais.residence.create({ ...data, studentIDs: [] });
      closeCallback();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="col-md-4">
          <label htmlFor="city">Город</label>
          <input className="form-control" name="city" ref={register({ required: true })} />
        </div>
        <div className="col-md-4">
          <label htmlFor="address">Адрес</label>
          <input className="form-control" name="address" ref={register({ required: true })} />
        </div>
        <div className="col-md-4">
          <label htmlFor="community">Общежитие</label>
          <input className="form-control" type="checkbox" name="community" ref={register()} />
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

export default AddResidence;
