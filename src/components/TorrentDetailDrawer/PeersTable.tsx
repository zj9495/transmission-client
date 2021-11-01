import React from "react";
import { useIntl } from "react-intl";
import { DataGridPro, GridColDef, GridColTypeDef } from "@mui/x-data-grid-pro";

import { formatSpeed } from "src/utils/formatter";
import renderProgress from "src/components/TorrentTable/renderProgress";

export type ServerTableProps = {
  rows: any[];
};

const useSpeed: GridColTypeDef = {
  type: "number",
  valueFormatter: ({ value }) => formatSpeed(Number(value)),
};

const UserTable = (props: ServerTableProps) => {
  const intl = useIntl();
  const { rows } = props;
  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "address",
        headerName: intl.formatMessage({
          id: "torrent.attribute.peersFields.address",
        }),
        flex: 1,
      },
      {
        field: "port",
        headerName: intl.formatMessage({
          id: "torrent.attribute.peersFields.port",
        }),
      },
      {
        field: "isUTP",
        headerName: intl.formatMessage({
          id: "torrent.attribute.peersFields.isUtp",
        }),
      },
      {
        field: "clientName",
        headerName: intl.formatMessage({
          id: "torrent.attribute.peersFields.clientName",
        }),
      },
      {
        field: "flagStr",
        headerName: intl.formatMessage({
          id: "torrent.attribute.peersFields.flagStr",
        }),
      },
      {
        field: "progress",
        headerName: intl.formatMessage({
          id: "torrent.attribute.peersFields.progress",
        }),
        renderCell: renderProgress,
      },
      {
        field: "rateToClient",
        headerName: intl.formatMessage({
          id: "torrent.attribute.peersFields.rateToClient",
        }),
        ...useSpeed,
      },
      {
        field: "rateToPeer",
        headerName: intl.formatMessage({
          id: "torrent.attribute.peersFields.rateToPeer",
        }),
        ...useSpeed,
      },
    ],
    [intl]
  );

  return (
    <div data-testid="files-table" style={{ height: "400px" }}>
      <DataGridPro
        getRowId={(row) => row.address}
        density="compact"
        rows={rows}
        columns={columns}
      />
    </div>
  );
};

export default UserTable;
