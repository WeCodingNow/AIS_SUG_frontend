import { Action } from 'redux';
import { Model } from '../ais/types';

export interface PureRole {
  def: string;
}

export interface Role extends Model, PureRole {}

export const toRole = (data: any): Role => ({
  id: data['id'],
  def: data['def'],
});

export interface RoleState {
  role?: Role;
}

export const PUT_ROLE = 'PUT_ROLE';
interface PutRole extends Action<typeof PUT_ROLE> {
  payload: Role;
}

export const CLEAR_ROLE = 'CLEAR_ROLE';
type ClearRole = Action<typeof CLEAR_ROLE>;

export type RoleActionTypes = PutRole | ClearRole;
