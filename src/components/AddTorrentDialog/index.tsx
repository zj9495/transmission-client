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
} from "@material-ui/core";

import {
  getAddTorrentDialogOpen,
  getDownloadDirSelector,
} from "src/store/selector";
import { toggleAddTorrentDialog } from "src/store/actions/app";

import { addTorrent } from "src/api";

interface IFormInput {
  downloadDir: string;
  torrentUrl: string;
}

const AddTorrentDialog = () => {
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

  const onSubmit = (data: IFormInput) => {
    addTorrent(data.torrentUrl, data.downloadDir);
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <FormattedMessage id="toolbar.addTorrent" />
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              id="download-dir"
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
              id="torrent-link"
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
    </div>
  );
};

export default AddTorrentDialog;
