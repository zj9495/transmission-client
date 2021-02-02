import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
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
} from "../../store/selector";
import { toggleAddTorrentDialog } from "../../store/actions/app";

import { addTorrent } from "../../api";

const AddTorrentDialog = () => {
  const dispatch = useDispatch();
  const open = useSelector(getAddTorrentDialogOpen);
  const downloadDirFromStore = useSelector(getDownloadDirSelector);
  const [downloadDir, setDownloadDir] = React.useState("");
  const [torrentUrl, setTorrentUrl] = React.useState("");

  React.useEffect(() => {
    setDownloadDir(downloadDirFromStore);
  }, [downloadDirFromStore]);

  const handleDownloadDirChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDownloadDir(event.target.value);
  };

  const handleTorrentUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTorrentUrl(event.target.value);
  };

  const handleClose = () => {
    dispatch(toggleAddTorrentDialog(false));
    setTorrentUrl("");
  };

  const handleSubmit = () => {
    addTorrent(torrentUrl, downloadDir);
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
        <DialogContent>
          <TextField
            autoFocus
            id="download-dir"
            value={downloadDir}
            label={<FormattedMessage id="dialog.torrentAdd.downloadDir" />}
            fullWidth
            onChange={handleDownloadDirChange}
          />
          <TextField
            id="torrent-link"
            value={torrentUrl}
            label={<FormattedMessage id="dialog.torrentAdd.torrentUrl" />}
            multiline
            rows={4}
            fullWidth
            onChange={handleTorrentUrlChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="dialog.public.buttonCancel" />
          </Button>
          <Button onClick={handleSubmit} color="primary">
            <FormattedMessage id="dialog.public.buttonOk" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTorrentDialog;
