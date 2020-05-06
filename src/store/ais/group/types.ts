import { Action } from 'redux';
import { Model, HashTable, ChangeAction } from '../types';

export interface PureGroup {
  number: number;

  cathedraID: number;
  studentIDs: Array<number>;
  semesterIDs: Array<number>;
}

export interface Group extends Model, PureGroup {}

export type GroupState = HashTable<Group>;

export const PUT_GROUP = 'PUT_GROUP';
export const CHANGE_GROUP = 'CHANGE_GROUP';

interface PutGroup extends Action<typeof PUT_GROUP> {
  payload: Group;
}

interface ChangeGroup extends Action<typeof CHANGE_GROUP> {
  payload: ChangeAction<PureGroup>;
}

export type GroupActionTypes = PutGroup | ChangeGroup;
