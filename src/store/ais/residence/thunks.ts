import { ThunkAction } from 'redux-thunk';

import { ResidenceActionTypes, Residence } from './types';
import { putResidence } from './creators';

import { State } from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, ResidenceActionTypes>;

export const getResidence = (id: number): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Residence.Get(id);
    const jsonedResp = await resp.json();

    dispatch(putResidence(jsonedResp));
  } catch (e) {
    console.log(e);
    console.log("couldn't get residence ", id);
  }
};

export const getResidences = (): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Residence.Get();
    const jsonedResp = await resp.json();

    jsonedResp.map((r: Residence) => dispatch(putResidence(r)));
  } catch (e) {
    console.log(e);
    console.log("couldn't get residences");
  }
};
