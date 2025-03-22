import React, { useState } from 'react';
import { AppButton, GroupButton } from '../index';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

const FilterCard: React.FC<{
  title: string;
  groupType: 'checkbox' | 'radio';
  values: string[];
  selectedValues: string[] | string;
  filterType: string;
  filterHandler: any;
}> = ({ title = 'UNKNOWN', groupType, values, selectedValues, filterType, filterHandler }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='filter-card'>
      <div className='d-flex justify-content-between mt-1'>
        <span className='fw-bold'>{title}</span>
        <AppButton className='toggle-button' onClick={toggleExpand}>
          {expanded ? <SlArrowUp /> : <SlArrowDown />}
        </AppButton>
      </div>
      {expanded && (
        <div>
          <GroupButton
            className={'group-form'}
            groupType={groupType}
            values={values}
            selectedValues={selectedValues}
            filterType={filterType}
            filterHandler={filterHandler}
          />
        </div>
      )}
    </div>
  );
};

export default FilterCard;
