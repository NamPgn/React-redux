import { Controller } from "react-hook-form";
import { Select } from "antd";
import React, { memo } from "react";
import MVText from "../../../MV/Text";

export const MVForm = ({ onSubmit, children, ...rest }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export const MySelectWrapper = memo(
  ({ placeholder, label, name, defaultValue, control, ...rest }: any) => {
    return (
      <div>
        <MVText htmlFor={name}>{label + ": "}</MVText>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              className="mt-2"
              style={{ width: "100%" }}
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
);
