import { CathedraActionTypes, Cathedra, PureCathedra, PUT_CATHEDRA, CHANGE_CATHEDRA } from './types';

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
