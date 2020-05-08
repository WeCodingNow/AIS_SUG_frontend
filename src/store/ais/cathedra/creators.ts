import {
  CathedraActionTypes,
  Cathedra,
  PureCathedra,
  PUT_CATHEDRA,
  CHANGE_CATHEDRA,
  CHANGE_LOADING_CATHEDRA,
} from './types';
import { LoadingState } from '../../loading/types';

export const putCathedra = (cathedra: Cathedra): CathedraActionTypes => ({
  type: PUT_CATHEDRA,
  payload: cathedra,
});

export const changeCathedra = (id: number, cathedra: PureCathedra): CathedraActionTypes => ({
  type: CHANGE_CATHEDRA,
  payload: {
    id,
    model: cathedra,
  },
});

export const changeCathedraLoadingState = (state: LoadingState): CathedraActionTypes => ({
  type: CHANGE_LOADING_CATHEDRA,
  state: state,
});
