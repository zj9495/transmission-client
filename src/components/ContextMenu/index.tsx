import React from "react";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

type ContextMenuProps = {
  open: boolean;
  x: null | number;
  y: null | number;
  onClose: () => void;
};

const ContextMenu = ({ open, x, y, onClose }: ContextMenuProps) => (
  <Menu
    keepMounted
    open={open}
    onClose={onClose}
    anchorReference="anchorPosition"
    anchorPosition={y !== null && x !== null ? { top: y, left: x } : undefined}
  >
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.start" />
    </MenuItem>
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.pause" />
    </MenuItem>
    <Divider />
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.rename" />
    </MenuItem>
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.remove" />
    </MenuItem>
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.recheck" />
    </MenuItem>
    <Divider />
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.morePeers" />
    </MenuItem>
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.changeDownloadDir" />
    </MenuItem>
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.copyPathToClipboard" />
    </MenuItem>
    <Divider />
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.moveTop" />
    </MenuItem>
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.moveUp" />
    </MenuItem>
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.moveDown" />
    </MenuItem>
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.moveBottom" />
    </MenuItem>
    <MenuItem onClick={onClose}>
      <FormattedMessage id="toolbar.tip.copyMagnetLink" />
    </MenuItem>
    <Divider />
  </Menu>
);

export default ContextMenu;
