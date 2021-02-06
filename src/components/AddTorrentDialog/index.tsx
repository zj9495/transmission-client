import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import {
  getAddTorrentDialogOpen,
  getDownloadDirSelector,
} from "src/store/selector";
import { toggleAddTorrentDialog, setMessageBar } from "src/store/actions/app";

import { addTorrent } from "src/api";

import { IMessageConfig } from "src/types";

interface IFormInput {
  downloadDir: string;
  torrentUrl: string;
}

interface IAddResultTorrentInfo {
  hashString: string;
  id: number;
  name: string;
}

interface IAddResult {
  result: string;
  arguments: Record<
    "torrent-duplicate" | "torrent-added",
    IAddResultTorrentInfo
  >;
}

const AddTorrentDialog = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const open = useSelector(getAddTorrentDialogOpen);
  const downloadDirFromStore = useSelector(getDownloadDirSelector);
  const { register, handleSubmit, reset, errors } = useForm();

  React.useEffect(() => {
    reset({
      downloadDir: downloadDirFromStore,
      torrentUrl: null,
    });
  }, [downloadDirFromStore]);

  const handleClose = () => {
    dispatch(toggleAddTorrentDialog(false));
  };

  const handleAddResult = (result: IAddResult) => {
    let messageConfig: IMessageConfig;
    if (result.result !== "success") {
      messageConfig = {
        open: true,
        loading: false,
        message: intl.formatMessage({ id: "message.failure" }) + result.result,
        severity: "error",
      };
    } else if (result.arguments["torrent-added"]) {
      messageConfig = {
        open: true,
        loading: false,
        message: intl.formatMessage({ id: "message.added" }),
        severity: "success",
      };
    } else if (result.arguments["torrent-duplicate"]) {
      messageConfig = {
        open: true,
        loading: false,
        message: intl.formatMessage({ id: "message.duplicate" }),
        severity: "warning",
      };
    } else {
      messageConfig = {
        open: true,
        loading: false,
        message:
          intl.formatMessage({ id: "message.failure" }) +
          intl.formatMessage({ id: "message.unknownError" }),
        severity: "error",
      };
    }
    dispatch(setMessageBar(messageConfig));
  };

  const handleAdd = (data: IFormInput) => {
    dispatch(
      setMessageBar({
        open: true,
        loading: true,
        message: intl.formatMessage({ id: "message.adding" }),
        severity: "info",
      })
    );
    addTorrent(data.torrentUrl, data.downloadDir)
      .then((result) => handleAddResult(result.data as IAddResult))
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
    handleAdd(data);
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
        <FormattedMessage id="toolbar.addTorrent" />
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            inputProps={{
              "data-testid": "download-dir",
            }}
            error={!!errors.downloadDir}
            name="downloadDir"
            label={<FormattedMessage id="dialog.torrentAdd.downloadDir" />}
            fullWidth
            inputRef={register({
              required: "please input download dir",
            })}
            helperText={errors.downloadDir?.message || ""}
          />
          <TextField
            inputProps={{
              "data-testid": "orrent-link",
            }}
            autoFocus
            error={!!errors.torrentUrl}
            name="torrentUrl"
            label={<FormattedMessage id="dialog.torrentAdd.torrentUrl" />}
            multiline
            rows={4}
            fullWidth
            inputRef={register({
              required: "please input torrent link",
            })}
            helperText={errors.torrentUrl?.message || ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="dialog.public.buttonCancel" />
          </Button>
          <Button type="submit" color="primary">
            <FormattedMessage id="dialog.public.buttonOk" />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTorrentDialog;
