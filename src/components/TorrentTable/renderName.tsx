import * as React from "react";
import { GridCellParams } from "@mui/x-data-grid-pro";
import { Link, Tooltip } from "@mui/material";

import { TorrentId } from "src/types";

interface NameLinkProps {
  value: string;
  id: number;
  onClick?: (id: TorrentId) => void;
}

type RenderNameProps = GridCellParams & Pick<NameLinkProps, "onClick">;

// eslint-disable-next-line react/display-name
const NameLink = React.memo((props: NameLinkProps) => {
  const { id, value, onClick } = props;

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onClick && onClick(id);
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

export default function renderName(params: RenderNameProps) {
  return (
    <NameLink
      value={params.value as string}
      id={params.row.id as number}
      onClick={params.onClick}
    />
  );
}
