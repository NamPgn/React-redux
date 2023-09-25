import { Input } from 'antd';
import React, { memo } from 'react'
import { Controller } from 'react-hook-form';

const MVInput = memo(({ name, label, control, rules, ...rest }: any) => {
  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue=""
        render={({ field }) => (
          <Input
            className='mt-2'
            placeholder={label}
            {...field}
            {...rest}
          />
        )}
      />
    </div>
  );
});

export default MVInput