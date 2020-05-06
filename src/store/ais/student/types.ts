import { Action } from 'redux';
import { Model, HashTable, ChangeAction } from '../types';

export interface PureStudent {
  name: string;
  secondName: string;
  thirdName?: string;

  groupID: number;
  residenceID: number;
  contactIDs: Array<number>;
  markIDs: Array<number>;
}

export interface Student extends Model, PureStudent {}

export type StudentState = HashTable<Student>;

export const PUT_STUDENT = 'PUT_STUDENT';
export const CHANGE_STUDENT = 'CHANGE_STUDENT';

interface PutStudent extends Action<typeof PUT_STUDENT> {
  payload: Student;
}

interface ChangeStudent extends Action<typeof CHANGE_STUDENT> {
  payload: ChangeAction<PureStudent>;
}

export type StudentActionTypes = PutStudent | ChangeStudent;
