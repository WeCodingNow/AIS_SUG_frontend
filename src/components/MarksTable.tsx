import React, { useEffect } from 'react';

import { SUCCESS } from '../store/loading/types';
import { useSelector } from '../store/store';

import { Mark } from '../store/ais/mark/types';
import ais from '../store/ais/actions';

interface MarksTableProps {
  marks: Array<Mark>;
  disciplineID?: number;
}

export const MarksTable: React.FC<MarksTableProps> = ({ marks, disciplineID }) => {
  const controlEvents = useSelector((s) => s.ais.controlEvent.byID);
  const disciplines = useSelector((s) => s.ais.discipline.byID);

  const ceTypes = useSelector((s) => s.ais.controlEventType);

  useEffect(() => {
    ais.controlEventType.fillAll();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Тип</th>
          <th scope="col">Оценка</th>
          <th scope="col">Дата получения</th>
          {disciplineID === undefined ? <th scope="col">Дисциплина</th> : <></>}
        </tr>
      </thead>
      <tbody>
        {marks.map((m) => (
          <tr key={m.id}>
            <th>
              {ceTypes.loading === SUCCESS
                ? ceTypes.byID[controlEvents[m.controlEventID].typeID].def
                : 'узнаём тип КМ...'}
            </th>
            <th scope="row">{m.value}</th>
            <th>{m.date}</th>
            {disciplineID === undefined ? (
              <th>{disciplines[controlEvents[m.controlEventID].disciplineID].name}</th>
            ) : (
              <></>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
