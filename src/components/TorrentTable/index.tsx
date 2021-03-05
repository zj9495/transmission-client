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
  width: 130,
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

const TorrentTable: React.FC = () => {
  const { torrentStatus } = useParams<IParamTypes>();
  const intl = useIntl();
  const dispatch = useDispatch();
  const torrents = useSelector(getTorrents);
  const [columns] = React.useState<GridColDef[]>([
    {
      field: "name",
      headerName: intl.formatMessage({ id: "torrent.fields.name" }),
      width: 300,
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
      width: 120,
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
    },
    {
      field: "status",
      headerName: intl.formatMessage({ id: "torrent.fields.status" }),
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
      field: "completeSize",
      headerName: intl.formatMessage({ id: "torrent.fields.completeSize" }),
      ...useSize,
    },
    {
      field: "uploadedEver",
      headerName: intl.formatMessage({ id: "torrent.fields.uploadedEver" }),
      ...useSize,
    },
    {
      field: "addedDate",
      headerName: intl.formatMessage({ id: "torrent.fields.addedDate" }),
      ...useTime,
    },
    {
      field: "queuePosition",
      headerName: intl.formatMessage({ id: "torrent.fields.queuePosition" }),
    },
    {
      field: "trackers",
      headerName: intl.formatMessage({ id: "torrent.fields.trackers" }),
    },
    {
      field: "downloadDir",
      headerName: intl.formatMessage({ id: "torrent.fields.downloadDir" }),
    },
    {
      field: "activityDate",
      headerName: intl.formatMessage({ id: "torrent.fields.activityDate" }),
      ...useTime,
    },
    {
      field: "labels",
      headerName: intl.formatMessage({ id: "torrent.fields.labels" }),
    },
    {
      field: "doneDate",
      headerName: intl.formatMessage({ id: "torrent.fields.doneDate" }),
      ...useTime,
    },
  ]);
  const rows = torrents[torrentStatus];

  const handleSelectionChange = (params: GridSelectionModelChangeParams) => {
    dispatch(setSelectedIds(params.selectionModel.map((id) => Number(id))));
  };

  return (
    <div
      id="torrent-table"
      style={{ height: "calc(100vh - 132px)", width: "100%" }}
    >
      <XGrid
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
