import { Controller } from 'react-hook-form';
import { Input, Select, Upload } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { MyButton } from '../../components/Button';

const renderInput = (name, label, control, rules?, ...rest) => {
  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue=""
        render={({ field }) => (
          <Input className='mt-2' placeholder={label} {...field} />
        )}
      />
    </div>
  );
};


export const MySelectWrapper = ({ placeholder, label, name, defaultValue, control, ...rest }) => {
  return (
    <div>
      <div>
        <label htmlFor={name}>{label + ": "}</label>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            className='mt-2'
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


export const MyUploadWrapper = ({ label, name, control, ...rest }) => {
  return (
    <div className="mt-2">
      <div>
        <label htmlFor={name}>{label + ": "}</label>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Upload
            name={name}
            beforeUpload={() => false}
            onChange={(info) => {
              const fileList = info.fileList.slice(-1); // Chỉ lấy file cuối cùng trong danh sách
              field.onChange(fileList[0]?.originFileObj); // Truyền dữ liệu file thực tế vào field
            }}
          >
            <MyButton
              icon={<UploadOutlined />}
              className='mt-2'
            >
              Click to Upload
            </MyButton>
          </Upload>
        )}
      />
    </div>
  );
};

export default renderInput