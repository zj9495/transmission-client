import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import { GridCellParams } from "@material-ui/x-grid";
import { FormattedMessage } from "react-intl";
import { SelectChange } from "./types";

type Props = {
  onChange: SelectChange;
};

const renderWantedSelect = (props: GridCellParams & Props) => (
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={Number(props.value)}
    onChange={(event) => {
      props.onChange(event, props);
    }}
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
