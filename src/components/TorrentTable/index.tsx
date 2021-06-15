import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
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

import { getTorrents, getSelectedIds, getLocale } from "src/store/selector";
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

const TorrentTable: React.FC = () => {
  const { torrentStatus } = useParams<IParamTypes>();
  const torrents = useSelector(getTorrents);
  const locale = useSelector(getLocale);
  const selectedIds = useSelector(getSelectedIds);
  const dispatch = useDispatch();
  const classes = useStyles();
  const intl = useIntl();
  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: intl.formatMessage({ id: "torrent.fields.name" }),
        width: 360,
        renderCell: renderName,
      },
      {
        field: "totalSize",
        headerName: intl.formatMessage({ id: "torrent.fields.totalSize" }),
        ...useSize,
      },
      {
        field: "percentDone",
        headerName: intl.formatMessage({ id: "torrent.fields.percentDone" }),
        type: "number",
        width: 100,
        renderCell: renderProgress,
      },
      {
        field: "leftUntilDone",
        headerName: intl.formatMessage({ id: "torrent.fields.remainingTime" }),
        valueFormatter: ({ value, row }) =>
          value && row.rateDownload
            ? formatLeftTime(Number(value) / Number(row.rateDownload))
            : " ",
      },
      {
        field: "uploadRatio",
        headerName: intl.formatMessage({ id: "torrent.fields.uploadRatio" }),
        valueFormatter: ({ value }) => (Number(value) < 0 ? 0 : value),
      },
      {
        field: "status",
        headerName: intl.formatMessage({ id: "torrent.fields.totalSize" }),
        renderCell: renderStatus,
      },
      {
        field: "seederCount",
        headerName: intl.formatMessage({ id: "torrent.fields.seederCount" }),
      },
      {
        field: "leecherCount",
        headerName: intl.formatMessage({ id: "torrent.fields.leecherCount" }),
      },
      {
        field: "rateDownload",
        headerName: intl.formatMessage({ id: "torrent.fields.rateDownload" }),
        ...useSpeed,
      },
      {
        field: "rateUpload",
        headerName: intl.formatMessage({ id: "torrent.fields.rateUpload" }),
        ...useSpeed,
      },
      {
        field: "addedDate",
        headerName: intl.formatMessage({ id: "torrent.fields.addedDate" }),
        ...useTime,
      },
      {
        field: "downloadDir",
        headerName: intl.formatMessage({ id: "torrent.fields.downloadDir" }),
      },
      {
        field: "completeSize",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.completeSize" }),
        ...useSize,
      },
      {
        field: "uploadedEver",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.uploadedEver" }),
        ...useSize,
      },
      {
        field: "queuePosition",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.queuePosition" }),
      },
      {
        field: "trackers",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.trackers" }),
      },
      {
        field: "activityDate",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.activityDate" }),
        ...useTime,
      },
      {
        field: "labels",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.labels" }),
      },
      {
        field: "doneDate",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.doneDate" }),
        ...useTime,
      },
    ],
    [locale]
  );

  const rows = torrents[torrentStatus];

  const handleSelectionChange = (params: GridSelectionModelChangeParams) => {
    dispatch(setSelectedIds(params.selectionModel as number[]));
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
        selectionModel={selectedIds}
        pageSize={20}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={handleSelectionChange}
      />
    </div>
  );
};

export default TorrentTable;
