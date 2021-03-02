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
  FormControlLabel,
  Switch,
} from "@material-ui/core";

import {
  getAddTorrentDialogOpen,
  getDownloadDirSelector,
} from "src/store/selector";
import {
  toggleAddTorrentDialog,
  setMessageBar,
  showTorrentDownloadOptions,
} from "src/store/actions/app";

import { addTorrent } from "src/api";

import { IMessageConfig } from "src/types";

interface IFormInput {
  downloadDir: string;
  torrentUrl: string;
  advancedMode: boolean;
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

const DEFAULT_ADVANCED_MODE = true;
const AUTO_START = true;

const AddTorrentDialog = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const open = useSelector(getAddTorrentDialogOpen);
  const downloadDirFromStore = useSelector(getDownloadDirSelector);
  const { register, watch, handleSubmit, reset, errors } = useForm();
  const isAdvancedMode = watch("advancedMode", DEFAULT_ADVANCED_MODE);

  React.useEffect(() => {
    reset({
      downloadDir: downloadDirFromStore,
      torrentUrl: null,
      advancedMode: DEFAULT_ADVANCED_MODE,
      autoStart: AUTO_START,
    });
  }, [downloadDirFromStore]);

  const handleClose = () => {
    dispatch(toggleAddTorrentDialog(false));
  };

  const handleAddResult = (result: IAddResult, advancedMode: boolean) => {
    let messageConfig: IMessageConfig | null = null;
    if (result.result !== "success") {
      messageConfig = {
        open: true,
        loading: false,
        message:
          intl.formatMessage({ id: "message.failedAdd" }) + result.result,
        severity: "error",
      };
    } else if (result.arguments["torrent-added"]) {
      if (advancedMode) {
        dispatch(
          showTorrentDownloadOptions(result.arguments["torrent-added"].id)
        );
      } else {
        messageConfig = {
          open: true,
          loading: false,
          message: intl.formatMessage({ id: "message.added" }),
          severity: "success",
        };
      }
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
          intl.formatMessage({ id: "message.failedAdd" }) +
          intl.formatMessage({ id: "message.unknownError" }),
        severity: "error",
      };
    }

    messageConfig && dispatch(setMessageBar(messageConfig));
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
    addTorrent(data.torrentUrl, data.downloadDir, data.advancedMode)
      .then((result) =>
        handleAddResult(result.data as IAddResult, data.advancedMode)
      )
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
    handleAdd({
      ...data,
      downloadDir: data.downloadDir.trim(),
      torrentUrl: data.torrentUrl.trim(),
    });
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
              "data-testid": "torrent-link",
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
          <FormControlLabel
            label="Advaced mode"
            control={
              <Switch
                data-testid="advanced-mode"
                defaultChecked={DEFAULT_ADVANCED_MODE}
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
            <FormattedMessage
              id={
                isAdvancedMode
                  ? "dialog.public.buttonNext"
                  : "dialog.public.buttonOk"
              }
            />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTorrentDialog;
