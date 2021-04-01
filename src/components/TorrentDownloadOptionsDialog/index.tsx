import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Switch,
  FormControlLabel,
} from "@material-ui/core";

import { getTorrentDownloadOptions } from "src/store/selector";
import {
  closeTorrentDownloadOptionsDialog,
  addTorrentAdvancedMode,
} from "src/store/actions/app";

import TorrentFilesTable from "src/components/TorrentFilesTable";

type TFormInput = {
  downloadDir: string;
  name: string;
  autoStart: boolean;
};

const AUTO_START = true;

const TorrentDownloadOptionsDialog = () => {
  const dispatch = useDispatch();
  const { open, info } = useSelector(getTorrentDownloadOptions);
  const id = useSelector(getTorrentDownloadOptions).id as number;
  const { register, handleSubmit, reset, errors } = useForm();
  const downloadDir = info?.downloadDir;
  const name = info?.name;

  React.useEffect(() => {
    reset({
      downloadDir,
      name,
    });
  }, [downloadDir, name]);

  const handleCancel = () => {
    dispatch(closeTorrentDownloadOptionsDialog(id as number, true));
  };

  const onSubmit = (data: TFormInput) => {
    dispatch(
      addTorrentAdvancedMode({
        location: data.downloadDir,
        paused: !data.autoStart,
      })
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
      data-testid="add-torrent-dialog"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        <FormattedMessage id="toolbar.addTorrent" />
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box mb={1}>
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
          </Box>
          <Box mb={1}>
            <TextField
              inputProps={{
                "data-testid": "torrent-name",
              }}
              error={!!errors.name}
              name="name"
              label={<FormattedMessage id="torrent.fields.name" />}
              fullWidth
              inputRef={register({
                required: "please input torrent name",
              })}
              helperText={errors.name?.message || ""}
            />
          </Box>
          <Box>
            <TorrentFilesTable />
          </Box>
          <Box>
            <FormControlLabel
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
          <Button onClick={handleCancel} color="primary">
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

export default TorrentDownloadOptionsDialog;
