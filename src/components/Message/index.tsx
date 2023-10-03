import { message } from "antd";

export const MVSuccess = (props) => {
  return message.success(props);
};

export const MVWarning = (props) => {
  return message.warning(props);
};

export const MVError = (props) => {
  return message.error(props);
};
