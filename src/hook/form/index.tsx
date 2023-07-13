import { Controller } from 'react-hook-form';
import { Input } from 'antd';
import React from 'react';

const renderInput = (name, label, control, rules?) => {
  return (
    <div>
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

export default renderInput