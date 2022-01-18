import * as React from "react";
import { GridCellParams } from "@mui/x-data-grid-pro";
import { Link, Tooltip } from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

import { makeStyles, createStyles } from "@mui/styles";

import { TorrentId, ITorrent } from "src/types";
import { STATUS_TYPES, TORRENT_ERROR } from "src/constants";

const useStyles = makeStyles(() =>
  createStyles({
    name: {
      display: "flex",
      alignItems: "center",
    },
  })
);

interface NameLinkProps {
  torrent: ITorrent;
  id: number;
  onClick?: (id: TorrentId) => void;
}

type StatusIconProps = Pick<ITorrent, "status" | "error">;
type RenderNameProps = GridCellParams & Pick<NameLinkProps, "onClick">;

const StatusIcon = (props: StatusIconProps) => {
  const { status, error } = props;
  let Icon = DownloadIcon;
  switch (status) {
    case STATUS_TYPES.paused:
      Icon = PauseCircleIcon;
      break;
    case STATUS_TYPES.checkwait:
    case STATUS_TYPES.check:
    case STATUS_TYPES.downloadwait:
    case STATUS_TYPES.seedwait:
      Icon = ScheduleIcon;
      break;
    case STATUS_TYPES.download:
      Icon = DownloadIcon;
      break;
    case STATUS_TYPES.seed:
      Icon = UploadIcon;
      break;
    default:
      Icon = ScheduleIcon;
  }
  if (error) {
    Icon = error === TORRENT_ERROR.TrackerWarning ? WarningIcon : ErrorIcon;
  }
  return <Icon />;
};

// eslint-disable-next-line react/display-name
const NameLink = React.memo((props: NameLinkProps) => {
  const classes = useStyles();
  const { id, torrent, onClick } = props;
  const { name, status, color, error, errorString } = torrent;

  const tooltipTitle = React.useMemo(
    () => (
      <>
        <span>{name}</span>
        <br />
        <br />
        {errorString && <span>{errorString}</span>}
      </>
    ),
    [name, errorString]
  );

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onClick?.(id);
  };

  return (
    <Tooltip title={tooltipTitle}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link
        className={classes.name}
        component="button"
        color={color}
        variant="body2"
        underline="hover"
        onClick={handleClick}
      >
        <StatusIcon status={status} error={error} />
        {name}
      </Link>
    </Tooltip>
  );
});

export default function renderName(params: RenderNameProps) {
  return (
    <NameLink
      torrent={params.row as ITorrent}
      id={params.row.id as number}
      onClick={params.onClick}
    />
  );
}
