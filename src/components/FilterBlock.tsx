import React from 'react';

import { useSelector } from '../store/store';
import view from '../store/views/headman/actions';

export const FilterBlock: React.FC = () => {
  const filters = useSelector((st) => st.view.headman.filters);

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button
        type="button"
        onClick={() => {
          view.applyMoscowiteFilter(!filters.isMoscowite);
        }}
        className={`btn ${filters.isMoscowite ? 'btn-success' : 'btn-secondary'}`}
      >
        Живут в Москве
      </button>
      <button
        type="button"
        onClick={() => {
          view.applyCommunityFilter(!filters.isInCommunity);
        }}
        className={`btn ${filters.isInCommunity ? 'btn-success' : 'btn-secondary'}`}
      >
        Живут в общежитии
      </button>
    </div>
  );
};
