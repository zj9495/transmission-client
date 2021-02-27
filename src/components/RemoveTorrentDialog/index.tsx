import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
  Typography,
} from "@material-ui/core";

import {
  getRemoveTorrentsDialogOpen,
  getSelectedTorrents,
  getSelectedIds,
} from "src/store/selector";
import {
  toggleRemoveTorrentsDialog,
  setMessageBar,
} from "src/store/actions/app";
import { removeTorrents } from "src/api";

interface IFormInput {
  deleteLocalData: boolean;
}

type TResult = {
  result: "success" | string;
  arguments: Record<string, unknown>;
};

const AddTorrentDialog = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const open = useSelector(getRemoveTorrentsDialogOpen);
  const selectIds = useSelector(getSelectedIds);
  const selectedTorrents = useSelector(getSelectedTorrents);
  const { register, handleSubmit } = useForm();

  const handleClose = () => {
    dispatch(toggleRemoveTorrentsDialog(false));
  };

  const handleResult = (result: TResult) => {
    const isSuccess = result.result === "success";

    dispatch(
      setMessageBar({
        open: true,
        loading: false,
        message: isSuccess
          ? intl.formatMessage({ id: "message.removed" })
          : result.result,
        severity: isSuccess ? "success" : "error",
      })
    );
  };

  const handleRemove = (data: IFormInput) => {
    dispatch(
      setMessageBar({
        open: true,
        loading: true,
        message: intl.formatMessage({ id: "message.removing" }),
        severity: "info",
      })
    );
    removeTorrents(selectIds, data.deleteLocalData)
      .then((result) => handleResult(result.data as TResult))
      .catch(() => {
        dispatch(
          setMessageBar({
            open: true,
            loading: false,
            message: intl.formatMessage({ id: "message.unknownError" }),
            severity: "error",
          })
        );
      });
  };

  const onSubmit = (data: IFormInput) => {
    handleRemove(data);
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      data-testid="add-torrent-dialog"
    >
      <DialogTitle id="form-dialog-title">
        <FormattedMessage id="dialog.torrentRemove.title" />
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="subtitle2" gutterBottom>
              <FormattedMessage id="dialog.torrentRemove.confirmText" />
            </Typography>
            {selectedTorrents.map((torrent) => (
              <Typography key={torrent.id} variant="subtitle2" gutterBottom>
                {torrent.name}
              </Typography>
            ))}
          </DialogContentText>
          <FormControlLabel
            label={<FormattedMessage id="dialog.torrentRemove.removeData" />}
            control={
              <Switch
                data-testid="advanced-mode"
                color="primary"
                name="advancedMode"
                inputRef={register}
              />
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="dialog.public.buttonCancel" />
          </Button>
          <Button data-testid="add-form-submit" type="submit" color="primary">
            <FormattedMessage id="dialog.public.buttonOk" />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTorrentDialog;
