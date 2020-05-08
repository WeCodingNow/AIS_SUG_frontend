import { Action } from 'redux';

import { Model, ChangeAction, ModelState } from '../types';
import { LoadingAction, Loadable } from '../../loading/types';

export interface PureGroup {
  number: number;

  cathedraID: number;
  studentIDs: Array<number>;
  semesterIDs: Array<number>;
}

export interface Group extends Model, PureGroup {}

export const toGroup = (data: any): Group => ({
  id: data['id'],
  number: data['number'],

  cathedraID: data['cathedra']['id'],
  studentIDs: data['students'].map((st: any) => st['id']),
  semesterIDs: data['semesters'].map((sem: any) => sem['id']),
});

export interface GroupState extends ModelState<Group>, Loadable {}

export const PUT_GROUP = 'PUT_GROUP';
interface PutGroup extends Action<typeof PUT_GROUP> {
  payload: Group;
}

export const CHANGE_GROUP = 'CHANGE_GROUP';
interface ChangeGroup extends Action<typeof CHANGE_GROUP> {
  payload: ChangeAction<PureGroup>;
}

export const CHANGE_LOADING_GROUP = 'CHANGE_LOADING_GROUP';
export type ChangeLoadingGroup = LoadingAction<typeof CHANGE_LOADING_GROUP>;

export type GroupActionTypes = PutGroup | ChangeGroup | ChangeLoadingGroup;
