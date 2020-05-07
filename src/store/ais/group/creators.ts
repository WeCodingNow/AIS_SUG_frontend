import { GroupActionTypes, Group, PureGroup, PUT_GROUP, CHANGE_GROUP } from './types';

export const putGroup = (group: Group): GroupActionTypes => ({
  type: PUT_GROUP,
  payload: group,
});

export const changeGroup = (id: number, group: PureGroup): GroupActionTypes => ({
  type: CHANGE_GROUP,
  payload: {
    id,
    model: group,
  },
});
