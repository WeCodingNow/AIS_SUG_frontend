import { ThunkAction } from 'redux-thunk';

import { CathedraActionTypes, Cathedra, toCathedra } from './types';
import { putCathedra } from './creators';

import { State } from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, CathedraActionTypes>;

export const getCathedra = (id: number): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Cathedra.Get(id);
    const jsonedResp = await resp.json();

    dispatch(putCathedra(toCathedra(jsonedResp)));
  } catch (e) {
    console.log(e);
    console.log("couldn't get cathedra ", id);
  }
};

export const getCathedras = (): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Cathedra.Get();
    const jsonedResp = await resp.json();

    jsonedResp.map((c: Cathedra) => dispatch(putCathedra(toCathedra(c))));
  } catch (e) {
    console.log(e);
    console.log("couldn't get cathedras");
  }
};
