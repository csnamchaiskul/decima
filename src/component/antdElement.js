import { Form, Input, Radio, Select, Checkbox, DatePicker } from "antd";
import React from "react";

export const makeField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <Form.Item
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </Form.Item>
  );
};

export const AInput = makeField(Input);
export const ARadioGroup = makeField(Radio.Group);
export const ASelect = makeField(Select);
export const ACheckbox = makeField(Checkbox);
export const ATextarea = makeField(Input.TextArea);
export const ARangePicker = makeField(DatePicker.RangePicker);
