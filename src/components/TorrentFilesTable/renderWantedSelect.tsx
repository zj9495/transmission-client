import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import { GridCellParams } from "@material-ui/x-grid";
import { FormattedMessage } from "react-intl";

const renderWantedSelect = (props: GridCellParams) => (
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={Number(props.value)}
  >
    <MenuItem value={0}>
      <FormattedMessage id="torrent.attribute.status.false" />
    </MenuItem>
    <MenuItem value={1}>
      <FormattedMessage id="torrent.attribute.status.true" />
    </MenuItem>
  </Select>
);

export default renderWantedSelect;
