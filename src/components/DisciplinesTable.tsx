import React from 'react';

import { HashTable, HashToArray } from '../store/types';
import { Discipline } from '../store/ais/discipline/types';

export interface AvgMarkObj {
  [id: string]: number;
}

interface DisciplinesTableProps {
  disciplines: HashTable<Discipline>;
  averages: AvgMarkObj;
  selectedDisciplineID?: number;
  callback?: (discID?: number) => void;
}

export const DisciplinesTable: React.FC<DisciplinesTableProps> = ({
  disciplines,
  averages,
  selectedDisciplineID,
  callback,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Дисциплина</th>
          <th scope="col">Средний балл</th>
        </tr>
      </thead>
      <tbody>
        {HashToArray(disciplines).map((ind) => (
          <tr
            key={ind.id}
            className={selectedDisciplineID && ind.id === selectedDisciplineID ? 'selected-discipline' : ''}
          >
            <th
              scope="row"
              onClick={
                callback
                  ? () => {
                      callback(ind.id);
                    }
                  : undefined
              }
            >
              {ind.name}
            </th>
            <th>{(averages[ind.id] ?? 0).toString().slice(0, 4)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
