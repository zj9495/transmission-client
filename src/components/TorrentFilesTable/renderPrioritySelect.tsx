import React from "react";
import { FormattedMessage } from "react-intl";
import { Select, SelectProps, MenuItem } from "@material-ui/core";
import { GridCellParams } from "@material-ui/x-grid";
import FlagIcon from "@material-ui/icons/Flag";

type Props = {
  selectProps?: SelectProps;
};

const renderPrioritySelect = (props: GridCellParams & Props) => (
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={props.value}
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
