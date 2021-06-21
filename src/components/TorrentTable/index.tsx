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
import { COLUMNS_WIDTH } from "./constants";

const useSize: GridColTypeDef = {
  type: "number",
  valueFormatter: ({ value }) => formatSize(Number(value)),
};

const useSpeed: GridColTypeDef = {
  type: "number",
  valueFormatter: ({ value }) => formatSpeed(Number(value)),
};

const useTime: GridColTypeDef = {
  type: "number",
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
        renderCell: renderName,
        width: COLUMNS_WIDTH[locale].name,
      },
      {
        field: "totalSize",
        headerName: intl.formatMessage({ id: "torrent.fields.totalSize" }),
        width: COLUMNS_WIDTH[locale].totalSize,
        ...useSize,
      },
      {
        field: "percentDone",
        headerName: intl.formatMessage({ id: "torrent.fields.percentDone" }),
        type: "number",
        renderCell: renderProgress,
        width: COLUMNS_WIDTH[locale].percentDone,
      },
      {
        field: "leftUntilDone",
        headerName: intl.formatMessage({ id: "torrent.fields.remainingTime" }),
        valueFormatter: ({ value, row }) =>
          value && row.rateDownload
            ? formatLeftTime(Number(value) / Number(row.rateDownload))
            : " ",
        width: COLUMNS_WIDTH[locale].leftUntilDone,
      },
      {
        field: "uploadRatio",
        headerName: intl.formatMessage({ id: "torrent.fields.uploadRatio" }),
        valueFormatter: ({ value }) => (Number(value) < 0 ? 0 : value),
        width: COLUMNS_WIDTH[locale].uploadRatio,
      },
      {
        field: "status",
        headerName: intl.formatMessage({ id: "torrent.fields.status" }),
        renderCell: renderStatus,
        width: COLUMNS_WIDTH[locale].status,
      },
      {
        field: "seederCount",
        headerName: intl.formatMessage({ id: "torrent.fields.seederCount" }),
        width: COLUMNS_WIDTH[locale].seederCount,
      },
      {
        field: "leecherCount",
        headerName: intl.formatMessage({ id: "torrent.fields.leecherCount" }),
        width: COLUMNS_WIDTH[locale].leecherCount,
      },
      {
        field: "rateDownload",
        headerName: intl.formatMessage({ id: "torrent.fields.rateDownload" }),
        width: COLUMNS_WIDTH[locale].rateDownload,
        ...useSpeed,
      },
      {
        field: "rateUpload",
        headerName: intl.formatMessage({ id: "torrent.fields.rateUpload" }),
        width: COLUMNS_WIDTH[locale].rateUpload,
        ...useSpeed,
      },
      {
        field: "addedDate",
        headerName: intl.formatMessage({ id: "torrent.fields.addedDate" }),
        width: COLUMNS_WIDTH[locale].addedDate,
        ...useTime,
      },
      {
        field: "downloadDir",
        headerName: intl.formatMessage({ id: "torrent.fields.downloadDir" }),
        width: COLUMNS_WIDTH[locale].downloadDir,
      },
      {
        field: "completeSize",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.completeSize" }),
        width: COLUMNS_WIDTH[locale].completeSize,
        ...useSize,
      },
      {
        field: "uploadedEver",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.uploadedEver" }),
        width: COLUMNS_WIDTH[locale].uploadedEver,
        ...useSize,
      },
      {
        field: "queuePosition",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.queuePosition" }),
        width: COLUMNS_WIDTH[locale].queuePosition,
      },
      {
        field: "trackers",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.trackers" }),
        width: COLUMNS_WIDTH[locale].trackers,
      },
      {
        field: "activityDate",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.activityDate" }),
        width: COLUMNS_WIDTH[locale].activityDate,
        ...useTime,
      },
      {
        field: "labels",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.labels" }),
        width: COLUMNS_WIDTH[locale].labels,
      },
      {
        field: "doneDate",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.doneDate" }),
        width: COLUMNS_WIDTH[locale].doneDate,
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
