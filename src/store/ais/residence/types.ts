import { Action } from 'redux';
import { Model, ModelState, ChangeAction } from '../types';
import { Loadable, LoadingAction } from '../../loading/types';

export interface PureResidence {
  address: string;
  city: string;
  community: boolean;

  studentIDs: Array<number>;
}

export interface Residence extends Model, PureResidence {}

export const toResidence = (data: any): Residence => ({
  id: data['id'],
  address: data['address'],
  city: data['city'],
  community: data['community'],

  studentIDs: data['students'].map((s: any) => s['id']),
});

export interface ResidenceState extends ModelState<Residence>, Loadable {}

export const PUT_RESIDENCE = 'PUT_RESIDENCE';
export const CHANGE_RESIDENCE = 'CHANGE_RESIDENCE';

interface PutResidence extends Action<typeof PUT_RESIDENCE> {
  payload: Residence;
}

interface ChangeResidence extends Action<typeof CHANGE_RESIDENCE> {
  payload: ChangeAction<PureResidence>;
}

export const CHANGE_LOADING_RESIDENCE = 'CHANGE_LOADING_RESIDENCE';
export type ChangeLoadingResidence = LoadingAction<typeof CHANGE_LOADING_RESIDENCE>;

export type ResidenceActionTypes = PutResidence | ChangeResidence | ChangeLoadingResidence;
