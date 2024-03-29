import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuid } from "uuid";

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
} from "@mui/material";
import { useSnackbar } from "notistack";
import { uniq } from "lodash";

import { getAddTorrentDialogOpen } from "src/store/selector/add";
import { getDownloadDirSelector } from "src/store/selector/session";
import {
  toggleAddTorrentDialog,
  showTorrentDownloadOptions,
} from "src/store/actions/add";
import { getSessionAction } from "src/store/actions/session";

import * as api from "src/api";

import SnackbarMessage from "src/components/SnackbarMessage";

interface IFormInput {
  downloadDir: string;
  setDownloadDir: boolean;
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
const SET_DOWNLOAD_DIR = true;
const AUTO_START = true;

const getUrls = (url: string) =>
  uniq(
    url
      .trim()
      .split("\n")
      .filter((url) => url)
  );

const AddTorrentDialog = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const open = useSelector(getAddTorrentDialogOpen);
  const downloadDirFromStore = useSelector(getDownloadDirSelector);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    errors,
    setValue,
    control,
  } = useForm();
  const isAdvancedMode = watch("advancedMode", DEFAULT_ADVANCED_MODE);
  const torrentUrl = watch("torrentUrl");

  const disableAdvancedMode = React.useMemo(() => {
    const urls = getUrls(torrentUrl || "");
    return urls.length > 1;
  }, [torrentUrl]);

  React.useEffect(() => {
    if (disableAdvancedMode) {
      setValue("advancedMode", false);
    }
  }, [disableAdvancedMode]);

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

  const handleAddResult = (result: IAddResult, formData: IFormInput) => {
    if (result.result !== "success") {
      enqueueSnackbar(
        <SnackbarMessage
          title={intl.formatMessage({ id: "message.failedAdd" })}
          message={result.result}
        />,
        {
          variant: "error",
        }
      );
    } else if (result.arguments.torrentAdded) {
      if (formData.advancedMode) {
        dispatch(showTorrentDownloadOptions(result.arguments.torrentAdded.id));
      } else {
        enqueueSnackbar(
          <SnackbarMessage
            title={intl.formatMessage({ id: "message.added" })}
            message={result.arguments.torrentAdded.name}
          />
        );
      }
    } else if (result.arguments.torrentDuplicate) {
      enqueueSnackbar(
        <SnackbarMessage
          title={intl.formatMessage({ id: "message.duplicate" })}
          message={result.arguments.torrentDuplicate.name}
        />,
        {
          variant: "warning",
        }
      );
    } else {
      enqueueSnackbar(
        <SnackbarMessage
          title={intl.formatMessage({ id: "message.failedAdd" })}
          message={intl.formatMessage({ id: "message.unknownError" })}
        />,
        {
          variant: "error",
        }
      );
    }
  };

  const handleAdd = (data: IFormInput) => {
    const snackbarKey = uuid();
    enqueueSnackbar(intl.formatMessage({ id: "message.adding" }), {
      variant: "info",
      key: snackbarKey,
    });
    api
      .addTorrent(
        data.torrentUrl,
        data.downloadDir,
        data.advancedMode || !data.autoStart
      )
      .then((result) => handleAddResult(result.data as IAddResult, data))
      .catch(() => {
        enqueueSnackbar(intl.formatMessage({ id: "message.unknownError" }), {
          variant: "error",
        });
      })
      .finally(() => {
        closeSnackbar(snackbarKey);
      });
  };

  const addTorrents = (urls: string[], data: IFormInput) => {
    urls.forEach((url) => {
      handleAdd({
        ...data,
        torrentUrl: url,
      });
    });
  };

  const onSubmit = (data: IFormInput) => {
    const urls = getUrls(data.torrentUrl);
    addTorrents(urls, data);
    if (data.setDownloadDir) {
      api
        .setSession({
          downloadDir: data.downloadDir,
        })
        .finally(() => {
          dispatch(getSessionAction());
        });
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      fullWidth
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
            InputLabelProps={{ shrink: true }}
            variant="standard"
            error={!!errors.downloadDir}
            name="downloadDir"
            label={<FormattedMessage id="dialog.torrentAdd.downloadDir" />}
            fullWidth
            inputRef={register({
              required: "please input download dir",
            })}
            helperText={errors.downloadDir?.message || ""}
          />
          <Box>
            <FormControlLabel
              label={
                <FormattedMessage id="dialog.torrentAdd.setDefaultDownloadDir" />
              }
              control={
                <Switch
                  inputProps={{
                    // waiting for https://github.com/microsoft/TypeScript/issues/28960
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "data-testid": "set-download-dir",
                  }}
                  defaultChecked={SET_DOWNLOAD_DIR}
                  color="primary"
                  name="setDownloadDir"
                  inputRef={register}
                />
              }
            />
          </Box>
          <TextField
            inputProps={{
              "data-testid": "torrent-link",
            }}
            variant="standard"
            autoFocus
            error={!!errors.torrentUrl}
            name="torrentUrl"
            label={<FormattedMessage id="dialog.torrentAdd.torrentUrl" />}
            multiline
            rows={8}
            fullWidth
            inputRef={register({
              required: "please input torrent link",
            })}
            helperText={
              errors.torrentUrl?.message ||
              intl.formatMessage({ id: "dialog.torrentAdd.tipTorrentUrl" })
            }
          />
          <Box>
            <Controller
              name="advancedMode"
              control={control}
              render={({ value, onChange }) => (
                <FormControlLabel
                  label="Advaced mode"
                  disabled={disableAdvancedMode}
                  control={
                    <Switch
                      inputProps={{
                        // waiting for https://github.com/microsoft/TypeScript/issues/28960
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        "data-testid": "advanced-mode",
                      }}
                      checked={Boolean(value)}
                      defaultChecked={DEFAULT_ADVANCED_MODE}
                      color="primary"
                      name="advancedMode"
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  }
                />
              )}
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
