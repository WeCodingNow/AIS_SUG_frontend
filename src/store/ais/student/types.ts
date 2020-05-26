/* eslint-disable @typescript-eslint/camelcase */
import { Action } from 'redux';
import { Model, ModelState, ChangeAction } from '../../types';
import { Loadable, LoadingAction } from '../../loading/types';

export interface PureStudent {
  name: string;
  secondName: string;
  thirdName?: string;

  groupID: number;
  residenceID: number;
  contactIDs: Array<number>;
  markIDs: Array<number>;
  backlogIDs: Array<number>;
}

export interface Student extends Model, PureStudent {}

export const toStudent = (data: any): Student => ({
  id: data['id'],
  name: data['name'],
  secondName: data['second_name'],
  thirdName: data['third_name'],

  groupID: data['group']['id'],
  residenceID: data['residence']['id'],
  contactIDs: data['contacts'].map((co: any) => co['id']),
  markIDs: data['marks'].map((m: any) => m['id']),
  backlogIDs: data['backlogs'].map((b: any) => b['id']),
});

export const toBackStudent = (st: PureStudent) => ({
  first_name: st.name,
  second_name: st.secondName,
  third_name: st.thirdName,

  group_id: st.groupID,
  residence_id: st.residenceID,
});

export interface StudentState extends ModelState<Student>, Loadable {}

export const PUT_STUDENT = 'PUT_STUDENT';
interface PutStudent extends Action<typeof PUT_STUDENT> {
  payload: Student;
}

export const CHANGE_STUDENT = 'CHANGE_STUDENT';
interface ChangeStudent extends Action<typeof CHANGE_STUDENT> {
  payload: ChangeAction<PureStudent>;
}

export const CHANGE_LOADING_STUDENT = 'CHANGE_LOADING_STUDENT';
export type ChangeLoadingStudent = LoadingAction<typeof CHANGE_LOADING_STUDENT>;

export type StudentActionTypes = PutStudent | ChangeStudent | ChangeLoadingStudent;
