import { Action } from 'redux';
import { Model } from '../types';

export interface PureRole {
  id: number;
  def: string;
}

export interface Role extends Model, PureRole {}

export const toRole = (data: any): Role => ({
  id: data['id'],
  def: data['def'],
});

export interface Info {
  studentID?: number;
  groupID?: number;
  userID: number;
}

export const toInfo = (data: any): Info => {
  console.log('in to info', data);
  return {
    studentID: data['student_id'],
    userID: data['user_id'],
    groupID: data['group_id'],
  };
};

export interface MeState {
  role?: Role;
  info?: Info;
}

export const PUT_ROLE = 'PUT_ROLE';
interface PutRole extends Action<typeof PUT_ROLE> {
  payload: Role;
}

export const PUT_INFO = 'GET_INFO';
interface PutInfo extends Action<typeof PUT_INFO> {
  payload: Info;
}

export const CLEAR_ME = 'CLEAR_ME';
type ClearMe = Action<typeof CLEAR_ME>;

export type MeActionTypes = PutRole | PutInfo | ClearMe;
