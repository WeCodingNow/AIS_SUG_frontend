import { ResidenceActionTypes, Residence, PureResidence, PUT_RESIDENCE, CHANGE_RESIDENCE } from './types';

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
