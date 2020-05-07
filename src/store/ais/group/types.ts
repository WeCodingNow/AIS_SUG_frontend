import { Action } from 'redux';
import { Model, HashTable, ChangeAction } from '../types';

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
  semesterIDs: data['students']
    .flatMap((st: any) => st['marks'])
    .flatMap((m: any) => m['control_event'])
    .flatMap((ce: any) => ce['semester'])
    .flatMap((sem: any) => sem['id'])
});

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
