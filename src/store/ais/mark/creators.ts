import { MarkActionTypes, Mark, PureMark, PUT_MARK, CHANGE_MARK } from './types';

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
