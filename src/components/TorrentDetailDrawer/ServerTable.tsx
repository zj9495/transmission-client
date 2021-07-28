import React from "react";
import { useIntl } from "react-intl";
import { XGrid, GridColDef } from "@material-ui/x-grid";

export type ServerTableProps = {
  rows: any[];
};

const ServerTable = (props: ServerTableProps) => {
  const intl = useIntl();
  const { rows } = props;
  const columns: GridColDef[] = [
    {
      field: "announce",
      headerName: intl.formatMessage({
        id: "torrent.attribute.serversFields.announce",
      }),
      flex: 1,
    },
    {
      field: "announceState",
      headerName: intl.formatMessage({
        id: "torrent.attribute.serversFields.announceState",
      }),
    },
    {
      field: "lastAnnounceResult",
      headerName: intl.formatMessage({
        id: "torrent.attribute.serversFields.lastAnnounceResult",
      }),
    },
    {
      field: "downloadCount",
      headerName: intl.formatMessage({
        id: "torrent.attribute.serversFields.downloadCount",
      }),
    },
    {
      field: "leecherCount",
      headerName: intl.formatMessage({
        id: "torrent.attribute.serversFields.leecherCount",
      }),
    },
    {
      field: "seederCount",
      headerName: intl.formatMessage({
        id: "torrent.attribute.serversFields.seederCount",
      }),
    },
    {
      field: "lastAnnounceSucceeded",
      headerName: intl.formatMessage({
        id: "torrent.attribute.serversFields.lastAnnounceSucceeded",
      }),
    },
    {
      field: "lastAnnounceTime",
      headerName: intl.formatMessage({
        id: "torrent.attribute.serversFields.lastAnnounceTime",
      }),
    },
    {
      field: "lastAnnounceTimedOut",
      headerName: intl.formatMessage({
        id: "torrent.attribute.serversFields.lastAnnounceTimedOut",
      }),
    },
    {
      field: "nextAnnounceTime",
      headerName: intl.formatMessage({
        id: "torrent.attribute.serversFields.nextAnnounceTime",
      }),
    },
  ];

  return (
    <div data-testid="files-table" style={{ height: "400px" }}>
      <XGrid density="compact" rows={rows} columns={columns} />
    </div>
  );
};

export default React.memo(ServerTable);
