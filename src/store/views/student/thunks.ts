import { ThunkAction } from 'redux-thunk';

import { State } from '../../store';
import { StudentViewsActions } from './types';
import { fillStudent } from '../../ais/student/thunks';
import { putOwnStudent, startLoadingOwnStudent, failLoadingOwnStudent, finishLoadingOwnStudent } from './creators';

import { fillInfo } from '../../me/thunks';

import { fillMark } from '../../ais/mark/thunks';
import { fillControlEvent } from '../../ais/control_event/thunks';

import { fillSemester } from '../../ais/semester/thunks';
import { fillDiscipline } from '../../ais/discipline/thunks';
import { fillCathedra } from '../../ais/cathedra/thunks';

import { fillResidence } from '../../ais/residence/thunks';
import { fillContact } from '../../ais/contact/thunks';
import { fillContactType } from '../../ais/contact_type/thunks';

import { fillControlEventType } from '../../ais/control_event_type/thunks';

import { fillBacklog } from '../../ais/backlog/thunks';
import { fillGroup } from '../../ais/group/thunks';

type ThunkResult<R> = ThunkAction<R, State, undefined, StudentViewsActions>;

const maxRefreshes = 5;
let refreshCounter = maxRefreshes;

export const loadOwnStudent = (): ThunkResult<void> => async (dispatch) => {
  if (refreshCounter !== maxRefreshes) {
    refreshCounter++;
    return;
  }

  refreshCounter = 0;

  try {
    dispatch(startLoadingOwnStudent());
    const info = await dispatch(fillInfo());

    if (!info.studentID) {
      throw new Error("couldn't get student id");
    }

    const student = await dispatch(fillStudent(info.studentID));

    await Promise.all(
      student.markIDs.map(async (mID) => {
        const mark = await dispatch(fillMark(mID));
        const controlEvent = await dispatch(fillControlEvent(mark.controlEventID));
        await dispatch(fillControlEventType(controlEvent.typeID));
      }),
    );

    await Promise.all(student.backlogIDs.map(async (bID) => await dispatch(fillBacklog(bID))));

    await dispatch(fillResidence(student.residenceID));

    await Promise.all(
      student.contactIDs.map(async (cID) => {
        const contact = await dispatch(fillContact(cID));
        await dispatch(fillContactType(contact.typeID));
      }),
    );

    console.log('finished loading student stuff');

    const group = await dispatch(fillGroup(student.groupID));
    await dispatch(fillCathedra(group.cathedraID));
    await Promise.all(
      group.semesterIDs.map(async (sID) => {
        const semester = await dispatch(fillSemester(sID));
        await Promise.all(semester.disciplineIDs.map(async (dID) => await dispatch(fillDiscipline(dID))));
      }),
    );

    dispatch(putOwnStudent(student));

    console.log('dispatching finisher of loading');
    dispatch(finishLoadingOwnStudent());
  } catch (e) {
    console.log(e);
    dispatch(failLoadingOwnStudent());
  }
};
