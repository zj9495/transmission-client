import React from "react";
import { Snackbar, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";

import { getMessageConfig } from "src/store/selector";
import { setMessageBar } from "src/store/actions/app";

const ALERT__ICON_SIZE = 22;

const MessageBar = () => {
  const dispatch = useDispatch();
  const messageConfig = useSelector(getMessageConfig);

  const { key, open, loading, message, severity } = messageConfig;

  const onClose = () => {
    dispatch(
      setMessageBar({
        ...messageConfig,
        open: false,
      })
    );
  };

  return (
    <>
      <Snackbar
        key={key}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
      >
        <Alert
          data-testid="message-bar"
          elevation={6}
          variant="filled"
          onClose={onClose}
          severity={severity}
          icon={
            loading ? (
              <CircularProgress color="inherit" size={ALERT__ICON_SIZE} />
            ) : undefined
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MessageBar;
