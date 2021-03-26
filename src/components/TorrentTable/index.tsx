import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import {
  XGrid,
  GridColDef,
  GridColTypeDef,
  GridCellParams,
  GridSelectionModelChangeParams,
  GridToolbar,
} from "@material-ui/x-grid";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { useParams } from "react-router-dom";

import { getTorrents } from "src/store/selector";
import { setSelectedIds } from "src/store/actions/rpc";
import {
  formatSize,
  formatSpeed,
  formatUnixTimeStamp,
  formatLeftTime,
} from "src/utils/formatter";
import { IParamTypes } from "src/types";
import renderName from "./renderName";
import renderProgress from "./renderProgress";

const useSize: GridColTypeDef = {
  type: "number",
  width: 100,
  valueFormatter: ({ value }) => formatSize(Number(value)),
};

const useSpeed: GridColTypeDef = {
  type: "number",
  width: 130,
  valueFormatter: ({ value }) => formatSpeed(Number(value)),
};

const useTime: GridColTypeDef = {
  type: "number",
  width: 200,
  valueFormatter: ({ value }) => formatUnixTimeStamp(Number(value)),
};

const renderStatus = ({ value }: GridCellParams) => (
  <FormattedMessage id={`torrent.statusText.${value}`} />
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    table: {
      border: 0,
      padding: theme.spacing(0, 1),
    },
  })
);

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: ((
      <FormattedMessage id="torrent.fields.name" />
    ) as unknown) as string,
    width: 360,
    renderCell: renderName,
  },
  {
    field: "totalSize",
    headerName: ((
      <FormattedMessage id="torrent.fields.totalSize" />
    ) as unknown) as string,
    ...useSize,
  },
  {
    field: "percentDone",
    headerName: ((
      <FormattedMessage id="torrent.fields.percentDone" />
    ) as unknown) as string,
    type: "number",
    width: 100,
    renderCell: renderProgress,
  },
  {
    field: "leftUntilDone",
    headerName: ((
      <FormattedMessage id="torrent.fields.remainingTime" />
    ) as unknown) as string,
    valueFormatter: ({ value, row }) =>
      value && row.rateDownload
        ? formatLeftTime(Number(value) / Number(row.rateDownload))
        : " ",
  },
  {
    field: "uploadRatio",
    headerName: ((
      <FormattedMessage id="torrent.fields.uploadRatio" />
    ) as unknown) as string,
  },
  {
    field: "status",
    headerName: ((
      <FormattedMessage id="torrent.fields.status" />
    ) as unknown) as string,
    renderCell: renderStatus,
  },
  {
    field: "seederCount",
    headerName: ((
      <FormattedMessage id="torrent.fields.seederCount" />
    ) as unknown) as string,
  },
  {
    field: "leecherCount",
    headerName: ((
      <FormattedMessage id="torrent.fields.leecherCount" />
    ) as unknown) as string,
  },
  {
    field: "rateDownload",
    headerName: ((
      <FormattedMessage id="torrent.fields.rateDownload" />
    ) as unknown) as string,
    ...useSpeed,
  },
  {
    field: "rateUpload",
    headerName: ((
      <FormattedMessage id="torrent.fields.rateUpload" />
    ) as unknown) as string,
    ...useSpeed,
  },
  {
    field: "completeSize",
    headerName: ((
      <FormattedMessage id="torrent.fields.completeSize" />
    ) as unknown) as string,
    ...useSize,
  },
  {
    field: "uploadedEver",
    headerName: ((
      <FormattedMessage id="torrent.fields.uploadedEver" />
    ) as unknown) as string,
    ...useSize,
  },
  {
    field: "addedDate",
    headerName: ((
      <FormattedMessage id="torrent.fields.addedDate" />
    ) as unknown) as string,
    ...useTime,
  },
  {
    field: "queuePosition",
    headerName: ((
      <FormattedMessage id="torrent.fields.queuePosition" />
    ) as unknown) as string,
  },
  {
    field: "trackers",
    headerName: ((
      <FormattedMessage id="torrent.fields.trackers" />
    ) as unknown) as string,
  },
  {
    field: "downloadDir",
    headerName: ((
      <FormattedMessage id="torrent.fields.downloadDir" />
    ) as unknown) as string,
  },
  {
    field: "activityDate",
    headerName: ((
      <FormattedMessage id="torrent.fields.activityDate" />
    ) as unknown) as string,
    ...useTime,
  },
  {
    field: "labels",
    headerName: ((
      <FormattedMessage id="torrent.fields.labels" />
    ) as unknown) as string,
  },
  {
    field: "doneDate",
    headerName: ((
      <FormattedMessage id="torrent.fields.doneDate" />
    ) as unknown) as string,
    ...useTime,
  },
];

const TorrentTable: React.FC = () => {
  const { torrentStatus } = useParams<IParamTypes>();
  const torrents = useSelector(getTorrents);
  const dispatch = useDispatch();
  const classes = useStyles();

  const rows = torrents[torrentStatus];

  const handleSelectionChange = (params: GridSelectionModelChangeParams) => {
    dispatch(setSelectedIds(params.selectionModel.map((id) => Number(id))));
  };

  return (
    <div
      id="torrent-table"
      style={{ height: "calc(100vh - 117px)", width: "100%" }}
    >
      <XGrid
        className={classes.table}
        components={{
          Toolbar: GridToolbar,
        }}
        rows={rows}
        columns={columns}
        pageSize={20}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={handleSelectionChange}
      />
    </div>
  );
};

export default TorrentTable;
