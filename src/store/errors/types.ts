import { Action } from 'redux';

export interface ErrorState {
  unauthorized: boolean;
}

export const SET_UNAUTHORIZED_ERROR = 'SET_UNAUTHORIZED_ERROR';

interface SetUnauthorizedError extends Action<typeof SET_UNAUTHORIZED_ERROR> {
  unauthorized: boolean;
}

export type ErrorActionTypes = SetUnauthorizedError;
