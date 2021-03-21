import React from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import {
  XGrid,
  GridColDef,
  GridColTypeDef,
  GridSelectionModelChangeParams,
} from "@material-ui/x-grid";

import { getTorrentDownloadOptions } from "src/store/selector";
import { setDownloadSelectedFiles } from "src/store/actions/app";
import { formatSize } from "src/utils/formatter";
import renderProgress from "src/components/TorrentTable/renderProgress";
import renderWantedSelect from "./renderWantedSelect";
import renderPrioritySelect from "./renderPrioritySelect";

const useSize: GridColTypeDef = {
  type: "number",
  width: 100,
  valueFormatter: ({ value }) => formatSize(Number(value)),
};

const TorrentFilesTable: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const rows = useSelector(getTorrentDownloadOptions).files;
  const { selectedFilesIds } = useSelector(getTorrentDownloadOptions);
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: intl.formatMessage({
        id: "torrent.attribute.filesFields.name",
      }),
      flex: 1,
    },
    {
      field: "length",
      headerName: intl.formatMessage({
        id: "torrent.attribute.filesFields.length",
      }),
      ...useSize,
    },
    {
      field: "percentDone",
      headerName: intl.formatMessage({
        id: "torrent.attribute.filesFields.percentDone",
      }),
      type: "number",
      width: 120,
      renderCell: renderProgress,
      hide: true,
    },
    {
      field: "bytesCompleted",
      headerName: intl.formatMessage({
        id: "torrent.attribute.filesFields.bytesCompleted",
      }),
      ...useSize,
      hide: true,
    },
    {
      field: "wanted",
      headerName: intl.formatMessage({
        id: "torrent.attribute.filesFields.wanted",
      }),
      type: "number",
      width: 110,
      valueFormatter: ({ value }) => (value ? "Yes" : "No"),
      renderCell: renderWantedSelect,
      hide: true,
    },
    {
      field: "priority",
      headerName: intl.formatMessage({
        id: "torrent.attribute.filesFields.priority",
      }),
      type: "number",
      width: 120,
      renderCell: renderPrioritySelect,
    },
  ];

  const handleSelectionChange = (params: GridSelectionModelChangeParams) => {
    dispatch(setDownloadSelectedFiles(params.selectionModel));
  };

  return (
    <div data-testid="files-table" style={{ height: "400px", width: "640px" }}>
      <XGrid
        density="compact"
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        selectionModel={selectedFilesIds}
        onSelectionModelChange={handleSelectionChange}
      />
    </div>
  );
};

export default TorrentFilesTable;
