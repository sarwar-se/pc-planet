import React from 'react';
import { Form } from 'react-bootstrap';
import { GROUP_TYPE } from '../../constants/appConstants';

type SelectItem = {
  value: string | number;
  label: string;
};

type ButtonProps = {
  groupType: 'checkbox' | 'radio';
  values: SelectItem[];
  selectedValues: string[] | number[] | string | number;
  changeHandler: (value: string | number, variantId: number) => void;
  className: string;
  variantId: number;
};

const AppGroupButton: React.FC<ButtonProps> = ({
  groupType,
  values,
  selectedValues,
  changeHandler,
  className,
  variantId,
}) => {
  return (
    <Form className={`${className}`}>
      {values &&
        values.map((item: SelectItem) => (
          <Form.Check
            key={item.value}
            label={item.label}
            type={groupType}
            name={item.label}
            checked={
              groupType === GROUP_TYPE.CHECKBOX
                ? Array.isArray(selectedValues) &&
                  (selectedValues as (string | number)[]).includes(item.value)
                : selectedValues === item.value
            }
            onChange={() => {
              changeHandler(item.value, variantId);
            }}
          />
        ))}
    </Form>
  );
};

export default AppGroupButton;
