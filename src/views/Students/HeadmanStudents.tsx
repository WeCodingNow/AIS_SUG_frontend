import React, { useEffect } from 'react';

import { useSelector } from '../../store/store';
import ais from '../../store/ais/actions';

import { HeadmanStudentTable } from '../../components/HeadmanStudentTable';
import { shallowEqual } from 'react-redux';
import { makeGroupName } from '../../utils/funcs';
import { SUCCESS } from '../../store/loading/types';

const HeadmanStudents: React.FC = () => {
  const me = useSelector((st) => st.me, shallowEqual);

  const students = useSelector((st) => st.ais.student.byID, shallowEqual);
  const groups = useSelector((st) => st.ais.group, shallowEqual);
  const semesters = useSelector((st) => st.ais.semester, shallowEqual);
  const cathedras = useSelector((st) => st.ais.cathedra, shallowEqual);

  // console.log(group);

  useEffect(() => {
    ais.student.fillAll();
    ais.cathedra.fillAll();

    if (me.info && me.info.groupID) {
      ais.group.fill(me.info.groupID);
    }
  }, [me.info]);

  return (
    <div className="row">
      {me.info && me.info.groupID && groups.loading === SUCCESS && cathedras.loading === SUCCESS ? (
        <div className="col">
          <div className="row">
            Группа: {makeGroupName(me.info.groupID, groups.byID, semesters.byID, cathedras.byID)}
          </div>
          <div className="row">
            <HeadmanStudentTable students={students} />
          </div>
          <div className="row">second row</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HeadmanStudents;
