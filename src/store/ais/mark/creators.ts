import { MarkActionTypes, Mark, PureMark, PUT_MARK, CHANGE_MARK, CHANGE_LOADING_MARK } from './types';
import { LoadingState } from '../../loading/types';

export const putMark = (mark: Mark): MarkActionTypes => ({
  type: PUT_MARK,
  payload: mark,
});

export const changeMark = (id: number, mark: PureMark): MarkActionTypes => ({
  type: CHANGE_MARK,
  payload: {
    id,
    model: mark,
  },
});

export const changeMarkLoadingState = (state: LoadingState): MarkActionTypes => ({
  type: CHANGE_LOADING_MARK,
  state: state,
});
