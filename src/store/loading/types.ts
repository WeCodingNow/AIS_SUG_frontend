import { Action } from 'redux';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAILED = 'FAILED';

export type LoadingState = undefined | typeof LOADING | typeof SUCCESS | typeof FAILED;

export interface LoadingAction<T> extends Action<T> {
  state: LoadingState;
}

export interface Loadable {
  loading?: LoadingState;
}
