import React from "react";

export type SnackbarMessageProps = {
  title: string;
  message: string;
};

const SnackbarMessage = (props: SnackbarMessageProps) => (
  <p style={{ margin: 0 }}>
    {props.title}
    <br />
    {props.message}
  </p>
);

export default SnackbarMessage;
