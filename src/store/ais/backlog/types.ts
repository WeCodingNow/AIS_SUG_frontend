/* eslint-disable @typescript-eslint/camelcase */

import { Action } from 'redux';
import { Model, ModelState, ChangeAction } from '../../types';
import { Loadable, LoadingAction } from '../../loading/types';

export interface PureBacklog {
  desc: string;
  done: boolean;

  disciplineID: number;
  studentID: number;
}

export interface Backlog extends Model, PureBacklog {}

export const toBacklog = (data: any): Backlog => ({
  id: data['id'],
  desc: data['desc'],
  done: data['done'],

  studentID: data['student']['id'],
  disciplineID: data['discipline']['id'],
});

export const toBackBacklog = (b: PureBacklog) => ({
  desc: b.desc,
  student_id: b.studentID,
  discipline_id: b.disciplineID,
});

export interface ResidenceState extends ModelState<Backlog>, Loadable {}

export const PUT_BACKLOG = 'PUT_BACKLOG';
export const CHANGE_BACKLOG = 'CHANGE_BACKLOG';

interface PutBacklog extends Action<typeof PUT_BACKLOG> {
  payload: Backlog;
}

interface ChangeBacklog extends Action<typeof CHANGE_BACKLOG> {
  payload: ChangeAction<PureBacklog>;
}

export const CHANGE_LOADING_BACKLOG = 'CHANGE_LOADING_BACKLOG';
export type ChangeLoadingBacklog = LoadingAction<typeof CHANGE_LOADING_BACKLOG>;

export type BacklogActionTypes = PutBacklog | ChangeBacklog | ChangeLoadingBacklog;
