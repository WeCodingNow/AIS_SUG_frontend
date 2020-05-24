import { Action } from 'redux';
import { ModelState, Model, ClearAis } from '../types';
import { Loadable, LoadingAction } from '../loading/types';

export interface StudentBinding {
  studentID: number;
  userID?: number;
  roleID?: number;
}

export interface PureRole {
  def: string;
}

export interface Role extends Model, PureRole {}

interface StudentBindingsState extends ModelState<StudentBinding>, Loadable {}
interface RolesState extends ModelState<Role>, Loadable {}

export interface AdminState {
  studentBindings: StudentBindingsState;
  roles: RolesState;
}

export const PUT_STUDENT_BINDING = 'PUT_STUDENT_BINDING';

export const toStudentBinding = (data: any): StudentBinding => ({
  studentID: data['student_id'],
  userID: data['user_id'],
  roleID: data['role_id'],
});

interface PutUserBinding extends Action<typeof PUT_STUDENT_BINDING> {
  payload: StudentBinding;
}

export const PUT_ROLE_DEFINITION = 'PUT_ROLE_DEFINITION';

export const toRole = (data: any): Role => ({
  id: data['id'],
  def: data['def'],
});

interface PutRole extends Action<typeof PUT_ROLE_DEFINITION> {
  payload: Role;
}

export const CHANGE_LOADING_STUDENT_BINDINGS = 'CHANGE_LOADING_STUDENT_BINDINGS';
export type ChangeLoadingStudentBindings = LoadingAction<typeof CHANGE_LOADING_STUDENT_BINDINGS>;

export const CHANGE_LOADING_ROLE_DEFINITIONS = 'CHANGE_LOADING_ROLE_DEFINITIONS';
export type ChangeLoadingRoles = LoadingAction<typeof CHANGE_LOADING_ROLE_DEFINITIONS>;

export const PROMOTE_STUDENT = 'PROMOTE_USER';
export type PromoteUser = Action<typeof PROMOTE_STUDENT>;

export type AdminActionTypes =
  | PutUserBinding
  | PutRole
  | PromoteUser
  | ChangeLoadingStudentBindings
  | ChangeLoadingRoles
  | ClearAis;
