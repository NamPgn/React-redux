import { Controller } from 'react-hook-form';
import { Input, Select } from 'antd';
import React from 'react';

const renderInput = (name, label, control, rules?) => {
  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue=""
        render={({ field }) => (
          <Input  {...field} />
        )}
      />
    </div>
  );
};


export const MySelectWrapper = ({ placeholder, label, name, defaultValue, control, ...rest }) => {
  return (
    <div>
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            defaultValue={defaultValue}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...rest}
          />
        )}
      />
    </div>
  );
}
export default renderInput