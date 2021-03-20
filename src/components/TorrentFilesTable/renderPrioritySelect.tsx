import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import { GridCellParams } from "@material-ui/x-grid";
import { FormattedMessage } from "react-intl";

const renderPrioritySelect = (props: GridCellParams) => (
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={props.value}
  >
    <MenuItem value={1}>
      <FormattedMessage id="torrent.attribute.priority.high" />
    </MenuItem>
    <MenuItem value={0}>
      <FormattedMessage id="torrent.attribute.priority.normal" />
    </MenuItem>
    <MenuItem value={-1}>
      <FormattedMessage id="torrent.attribute.priority.low" />
    </MenuItem>
  </Select>
);

export default renderPrioritySelect;
