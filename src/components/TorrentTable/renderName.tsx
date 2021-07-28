import * as React from "react";
import { useDispatch } from "react-redux";
import { GridCellParams } from "@material-ui/x-grid";
import { Link, Tooltip } from "@material-ui/core";
import { showTorrentDetail } from "src/store/actions/app";

interface NameLinkProps {
  value: string;
  id: number;
}

// eslint-disable-next-line react/display-name
const NameLink = React.memo((props: NameLinkProps) => {
  const dispatch = useDispatch();
  const { id, value } = props;

  const handleClick = () => {
    dispatch(showTorrentDetail(id));
  };

  return (
    <Tooltip title={value}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link component="button" variant="body2" onClick={handleClick}>
        {value}
      </Link>
    </Tooltip>
  );
});

export default function renderName(params: GridCellParams) {
  return (
    <NameLink value={params.value as string} id={params.row.id as number} />
  );
}
