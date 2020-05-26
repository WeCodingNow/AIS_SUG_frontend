import { BacklogActionTypes, Backlog, PureBacklog, PUT_BACKLOG, CHANGE_BACKLOG, CHANGE_LOADING_BACKLOG } from './types';
import { LoadingState } from '../../loading/types';

export const putBacklog = (residence: Backlog): BacklogActionTypes => ({
  type: PUT_BACKLOG,
  payload: residence,
});

export const changeBacklog = (id: number, backlog: PureBacklog): BacklogActionTypes => ({
  type: CHANGE_BACKLOG,
  payload: {
    id,
    model: backlog,
  },
});

export const changeBacklogLoadingState = (state: LoadingState): BacklogActionTypes => ({
  type: CHANGE_LOADING_BACKLOG,
  state: state,
});
