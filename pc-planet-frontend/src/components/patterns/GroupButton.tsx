import React from 'react';
import { Form } from 'react-bootstrap';
import { GROUP_TYPE } from '../../utils/appConstant';

const GroupButton: React.FC<{
  groupType: 'checkbox' | 'radio';
  values: string[];
  selectedValues: string[] | string;
  filterType: string;
  filterHandler: any;
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
