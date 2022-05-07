import React from "react";
import { FormattedMessage } from "react-intl";
import { Select, SelectProps, MenuItem } from "@mui/material";
import { GridCellParams } from "@mui/x-data-grid-pro";
import FlagIcon from "@mui/icons-material/Flag";

type Props = {
  selectProps?: SelectProps;
};

const renderPrioritySelect = (props: GridCellParams & Props) => (
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={props.value}
    {...props.selectProps}
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
