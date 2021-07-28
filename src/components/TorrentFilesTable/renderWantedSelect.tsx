import React from "react";
import { Select, SelectProps, MenuItem } from "@material-ui/core";
import { GridCellParams } from "@material-ui/x-grid";
import { FormattedMessage } from "react-intl";

type Props = {
  selectProps?: SelectProps;
};

const renderWantedSelect = (props: GridCellParams & Props) => (
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={Number(props.value)}
    {...props.selectProps}
    style={{ width: "120px" }}
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
