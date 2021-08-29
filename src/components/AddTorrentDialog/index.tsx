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
  Box,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import { getAddTorrentDialogOpen } from "src/store/selector/add";
import { getDownloadDirSelector } from "src/store/selector/session";
import {
  toggleAddTorrentDialog,
  showTorrentDownloadOptions,
} from "src/store/actions/add";

import * as api from "src/api";

interface IFormInput {
  downloadDir: string;
  torrentUrl: string;
  advancedMode: boolean;
  autoStart: boolean;
}

interface IAddResultTorrentInfo {
  hashString: string;
  id: number;
  name: string;
}

interface IAddResult {
  result: string;
  arguments: Record<"torrentDuplicate" | "torrentAdded", IAddResultTorrentInfo>;
}

const DEFAULT_ADVANCED_MODE = true;
const AUTO_START = true;

const AddTorrentDialog = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

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
    if (result.result !== "success") {
      enqueueSnackbar(
        intl.formatMessage({ id: "message.failedAdd" }) + result.result,
        {
          variant: "error",
        }
      );
    } else if (result.arguments.torrentAdded) {
      if (advancedMode) {
        dispatch(showTorrentDownloadOptions(result.arguments.torrentAdded.id));
      } else {
        enqueueSnackbar(intl.formatMessage({ id: "message.added" }));
      }
    } else if (result.arguments.torrentDuplicate) {
      enqueueSnackbar(intl.formatMessage({ id: "message.duplicate" }), {
        variant: "warning",
      });
    } else {
      enqueueSnackbar(
        intl.formatMessage({ id: "message.failedAdd" }) +
          intl.formatMessage({ id: "message.unknownError" }),
        {
          variant: "error",
        }
      );
    }
  };

  const handleAdd = (data: IFormInput) => {
    enqueueSnackbar(intl.formatMessage({ id: "message.adding" }), {
      variant: "info",
    });
    api
      .addTorrent(
        data.torrentUrl,
        data.downloadDir,
        data.advancedMode || !data.autoStart
      )
      .then((result) =>
        handleAddResult(result.data as IAddResult, data.advancedMode)
      )
      .catch(() => {
        enqueueSnackbar(intl.formatMessage({ id: "message.unknownError" }), {
          variant: "error",
        });
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
          <Box>
            <FormControlLabel
              label="Advaced mode"
              control={
                <Switch
                  inputProps={{
                    // waiting for https://github.com/microsoft/TypeScript/issues/28960
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "data-testid": "advanced-mode",
                  }}
                  defaultChecked={DEFAULT_ADVANCED_MODE}
                  color="primary"
                  name="advancedMode"
                  inputRef={register}
                />
              }
            />
          </Box>
          <Box>
            <FormControlLabel
              disabled={isAdvancedMode}
              label="Start torrent"
              control={
                <Switch
                  inputProps={{
                    // waiting for https://github.com/microsoft/TypeScript/issues/28960
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "data-testid": "auto-start",
                  }}
                  defaultChecked={AUTO_START}
                  color="primary"
                  name="autoStart"
                  inputRef={register}
                />
              }
            />
          </Box>
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
