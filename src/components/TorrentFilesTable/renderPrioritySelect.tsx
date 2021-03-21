import React from "react";
import { FormattedMessage } from "react-intl";
import { Select, MenuItem } from "@material-ui/core";
import { GridCellParams } from "@material-ui/x-grid";
import FlagIcon from "@material-ui/icons/Flag";

const renderPrioritySelect = (props: GridCellParams) => (
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={props.value}
  >
    <MenuItem value={1}>
      <FlagIcon color="secondary" />
      <FormattedMessage id="torrent.attribute.priority.high" />
    </MenuItem>
    <MenuItem value={0}>
      <FlagIcon color="primary" />
      <FormattedMessage id="torrent.attribute.priority.normal" />
    </MenuItem>
    <MenuItem value={-1}>
      <FlagIcon color="action" />
      <FormattedMessage id="torrent.attribute.priority.low" />
    </MenuItem>
  </Select>
);

export default renderPrioritySelect;
