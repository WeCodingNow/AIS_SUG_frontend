import { Action } from 'redux';
import { Model, ModelState, ChangeAction } from '../types';
import { Loadable, LoadingAction } from '../../loading/types';

export interface PureDiscipline {
  name: string;
  hours: number;

  controlEventIDs: Array<number>;
}

export interface Discipline extends Model, PureDiscipline {}

export const toDiscipline = (data: any): Discipline => ({
  id: data['id'],
  name: data['name'],
  hours: data['hours'],

  controlEventIDs: data['control_events'].map((ce: any) => ce['id']),
});

export interface DisciplineState extends ModelState<Discipline>, Loadable {}

export const PUT_DISCIPLINE = 'PUT_DISCIPLINE';
interface PutDiscipline extends Action<typeof PUT_DISCIPLINE> {
  payload: Discipline;
}

export const CHANGE_DISCIPLINE = 'CHANGE_DISCIPLINE';
interface ChangeDiscipline extends Action<typeof CHANGE_DISCIPLINE> {
  payload: ChangeAction<PureDiscipline>;
}

export const CHANGE_LOADING_DISCIPLINE = 'CHANGE_LOADING_DISCIPLINE';
export type ChangeLoadingDiscipline = LoadingAction<typeof CHANGE_LOADING_DISCIPLINE>;

export type DisciplineActionTypes = PutDiscipline | ChangeDiscipline | ChangeLoadingDiscipline;
