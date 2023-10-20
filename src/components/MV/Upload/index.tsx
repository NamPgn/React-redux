import { Upload } from "antd";
import React, { memo } from "react";
import { Controller } from "react-hook-form";
import { MyButton } from "../Button";
import { UploadOutlined } from "@ant-design/icons";
import MVText from "../Text";

export const MVUpload = memo(({ label, name, control, ...rest }: any) => {
  return (
    <div className="mt-2">
      <div>
        <MVText htmlFor={name}>{label + ": "}</MVText>
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
            <MyButton icon={<UploadOutlined />} className="my-2">
              Click to Upload
            </MyButton>
          </Upload>
        )}
      />
    </div>
  );
});

export default MVUpload;
