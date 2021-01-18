import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { XGrid, ColDef, ColTypeDef, CellParams } from "@material-ui/x-grid";

import renderProgress from "./renderProgress";
import renderName from "./renderName";

import { getAllTorrents } from "../../store/selector";
import {
  formatSize,
  formatSpeed,
  formatUnixTimeStamp,
  formatLeftTime,
} from "../../utils/formatter";

const useSize: ColTypeDef = {
  type: "number",
  width: 130,
  valueFormatter: ({ value }) => formatSize(Number(value)),
};

const useSpeed: ColTypeDef = {
  type: "number",
  width: 130,
  valueFormatter: ({ value }) => formatSpeed(Number(value)),
};

const useTime: ColTypeDef = {
  type: "number",
  width: 200,
  valueFormatter: ({ value }) => formatUnixTimeStamp(Number(value)),
};

const renderStatus = ({ value }: CellParams) => (
  <FormattedMessage id={`torrent.statusText.${value}`} />
);

const columns: ColDef[] = [
  {
    field: "name",
    headerName: ((
      <FormattedMessage id="torrent.fields.name" />
    ) as unknown) as string,
    width: 130,
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
    width: 120,
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
  const torrents = useSelector(getAllTorrents);

  return (
    <div style={{ height: "calc(100vh - 112px)", width: "100%" }}>
      <XGrid
        rows={torrents}
        columns={columns}
        pageSize={20}
        loading={torrents.length === 0}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default TorrentTable;
