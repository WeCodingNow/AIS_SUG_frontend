import {
  ResidenceActionTypes,
  Residence,
  PureResidence,
  PUT_RESIDENCE,
  CHANGE_RESIDENCE,
  CHANGE_LOADING_RESIDENCE,
} from './types';
import { LoadingState } from '../../loading/types';

export const putResidence = (residence: Residence): ResidenceActionTypes => ({
  type: PUT_RESIDENCE,
  payload: residence,
});

export const changeResidence = (id: number, residence: PureResidence): ResidenceActionTypes => ({
  type: CHANGE_RESIDENCE,
  payload: {
    id,
    model: residence,
  },
});

export const changeResidenceLoadingState = (state: LoadingState): ResidenceActionTypes => ({
  type: CHANGE_LOADING_RESIDENCE,
  state: state,
});
