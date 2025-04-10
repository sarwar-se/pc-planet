import React, { Fragment } from 'react';
import { FormSelect } from 'react-bootstrap';

type SelectItem = {
  value: string | number;
  label: string;
};

const AppDropdown: React.FC<{
  title: string;
  disabledTitle?: boolean;
  selectItems: SelectItem[];
  value: string | number;
  handleChange: (value: string | number) => void;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
}> = ({
  title,
  disabledTitle = false,
  selectItems = [],
  value,
  handleChange,
  disabled = false,
  loading = false,
  required = false,
  ...rest
}) => {
  return (
    <Fragment>
      <div>
        <FormSelect
          onChange={(e) => handleChange(e.target.value)}
          value={value}
          disabled={disabled}
          isInvalid={required ? !value : false}
          {...rest}
        >
          {loading ? (
            <option>Loading...</option>
          ) : (
            <>
              <option value={''} disabled={disabledTitle}>
                {title}
              </option>
              {selectItems.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </>
          )}
        </FormSelect>
      </div>
    </Fragment>
  );
};

export default AppDropdown;
