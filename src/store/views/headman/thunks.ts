import { ThunkAction } from 'redux-thunk';

import { State } from '../../store';
import { HeadmanViewsActions } from './types';
import { fillStudent } from '../../ais/student/thunks';
import {
  putSelectedStudent,
  putOwnGroup,
  startLoadingOwnGroup,
  failLoadingOwnGroup,
  finishLoadingOwnGroup,
} from './creators';

import { fillInfo } from '../../me/thunks';
import { fillGroup } from '../../ais/group/thunks';
import { fillSemester } from '../../ais/semester/thunks';
import { fillMark } from '../../ais/mark/thunks';
import { fillDiscipline } from '../../ais/discipline/thunks';
import { fillControlEvent } from '../../ais/control_event/thunks';
import { fillCathedra } from '../../ais/cathedra/thunks';
import { fillResidence } from '../../ais/residence/thunks';

type ThunkResult<R> = ThunkAction<R, State, undefined, HeadmanViewsActions>;

export const selectStudent = (studentID: number): ThunkResult<void> => async (dispatch, getState) => {
  try {
    dispatch(fillStudent(studentID));
    dispatch(putSelectedStudent(getState().ais.student.byID[studentID]));
  } catch (e) {
    console.log(e);
  }
};

export const loadOwnGroup = (): ThunkResult<void> => async (dispatch) => {
  try {
    dispatch(startLoadingOwnGroup());
    const info = await dispatch(fillInfo());

    if (!info.groupID) {
      throw new Error("couldn't get group id");
    }

    const ownGroup = await dispatch(fillGroup(info.groupID));

    await dispatch(fillCathedra(ownGroup.cathedraID));

    Promise.all(
      ownGroup.semesterIDs.map(async (semID) => {
        const semester = await dispatch(fillSemester(semID));

        await Promise.all(
          semester.disciplineIDs.map(async (dID) => {
            await dispatch(fillDiscipline(dID));
          }),
        );

        await Promise.all(
          semester.controlEventIDs.map(async (ceID) => {
            await dispatch(fillControlEvent(ceID));
          }),
        );
      }),
    );

    console.log('finished loading semester stuff');

    await Promise.all(
      ownGroup.studentIDs.map(async (studID) => {
        const student = await dispatch(fillStudent(studID));
        await Promise.all(student.markIDs.map(async (mID) => await dispatch(fillMark(mID))));

        await dispatch(fillResidence(student.residenceID));
      }),
    );

    console.log('finished loading student stuff');

    dispatch(putOwnGroup(ownGroup));

    console.log('dispatching finisher of loading');
    dispatch(finishLoadingOwnGroup());
  } catch (e) {
    console.log(e);
    dispatch(failLoadingOwnGroup());
  }
};
