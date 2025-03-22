import React from 'react';
import { Form } from 'react-bootstrap';
import { FILTER_TYPE, GROUP_TYPE } from '../../constants/appConstants';

const GroupButton: React.FC<{
  groupType: 'checkbox' | 'radio';
  values: string[];
  selectedValues: string[] | string;
  filterType: FILTER_TYPE | string;
  filterHandler: (filterType: FILTER_TYPE | string, value: string) => void;
  className: string;
}> = ({ groupType, values, selectedValues, filterType, filterHandler, className }) => {
  return (
    <Form className={`${className}`}>
      {values &&
        values.map((item: string, i: number) => (
          <Form.Check
            className='check-box'
            key={i}
            label={item}
            type={groupType}
            name={item}
            checked={
              groupType === GROUP_TYPE.CHECKBOX
                ? selectedValues.includes(item)
                : selectedValues === item
            }
            onChange={() => {
              filterHandler(filterType, item);
            }}
          />
        ))}
    </Form>
  );
};

export default GroupButton;
