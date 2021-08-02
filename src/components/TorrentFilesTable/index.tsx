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
import {
  setDownloadSelectedFiles,
  setDownloadFilesWanted,
  setDownloadFilesPriority,
} from "src/store/actions/app";
import { formatSize } from "src/utils/formatter";
import { TFile } from "src/types";
import renderProgress from "src/components/TorrentTable/renderProgress";
import renderWantedSelect from "./renderWantedSelect";
import renderPrioritySelect from "./renderPrioritySelect";

const useSize: GridColTypeDef = {
  type: "number",
  width: 100,
  valueFormatter: ({ value }) => formatSize(Number(value)),
};

export type FileWantedChangeParams = {
  rowIndex: number;
  value: boolean;
};

export type FilePriorityChangeParams = {
  rowIndex: number;
  value: 1 | 0 | -1;
};

export type FilesTableProps = {
  files: TFile[];
  simple?: boolean;
  onFileWantedChange?: (params: FileWantedChangeParams) => void;
  onFilePriorityChange?: (params: FilePriorityChangeParams) => void;
  selectedFilesIds?: number[];
  onSelectionModelChange?: (params: GridSelectionModelChangeParams) => void;
};

export const FilesTable = (props: FilesTableProps) => {
  const intl = useIntl();
  const {
    files,
    simple = false,
    selectedFilesIds,
    onSelectionModelChange,
    onFileWantedChange,
    onFilePriorityChange,
  } = props;
  const columns: GridColDef[] = React.useMemo<GridColDef[]>(
    () => [
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
        hide: !simple,
      },
      {
        field: "bytesCompleted",
        headerName: intl.formatMessage({
          id: "torrent.attribute.filesFields.bytesCompleted",
        }),
        ...useSize,
        hide: !simple,
      },
      {
        field: "wanted",
        headerName: intl.formatMessage({
          id: "torrent.attribute.filesFields.wanted",
        }),
        type: "number",
        width: 110,
        valueFormatter: ({ value }) => (value ? "Yes" : "No"),
        renderCell: (cellProps) => {
          const onChange = (
            event: React.ChangeEvent<{
              name?: string | undefined;
              value: unknown;
            }>
          ) => {
            const value = Boolean(event.target.value);
            const rowIndex = cellProps.rowIndex as number;
            onFileWantedChange && onFileWantedChange({ rowIndex, value });
          };
          return renderWantedSelect({
            ...cellProps,
            selectProps: { onChange, disabled: simple },
          });
        },
        hide: !simple,
      },
      {
        field: "priority",
        headerName: intl.formatMessage({
          id: "torrent.attribute.filesFields.priority",
        }),
        type: "number",
        width: 120,
        renderCell: (cellProps) => {
          const onChange = (
            event: React.ChangeEvent<{
              name?: string | undefined;
              value: unknown;
            }>
          ) => {
            const value = event.target.value as 1 | 0 | -1;
            const rowIndex = cellProps.rowIndex as number;
            onFilePriorityChange && onFilePriorityChange({ rowIndex, value });
          };
          return renderPrioritySelect({
            ...cellProps,
            selectProps: { onChange, disabled: simple },
          });
        },
      },
    ],
    [intl]
  );

  return (
    <div data-testid="files-table" style={{ height: "400px" }}>
      <XGrid
        density="compact"
        rows={files}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        selectionModel={selectedFilesIds}
        onSelectionModelChange={onSelectionModelChange}
      />
    </div>
  );
};

const TorrentFilesTable = () => {
  const dispatch = useDispatch();
  const { files } = useSelector(getTorrentDownloadOptions);
  const { selectedFilesIds } = useSelector(getTorrentDownloadOptions);

  const handleSelectionChange = (params: GridSelectionModelChangeParams) => {
    dispatch(setDownloadSelectedFiles(params.selectionModel));
  };

  const handleFileWantedChange = (params: FileWantedChangeParams) => {
    dispatch(setDownloadFilesWanted(params));
  };

  const handleFilePriorityChange = (params: FilePriorityChangeParams) => {
    dispatch(setDownloadFilesPriority(params));
  };

  return (
    <FilesTable
      files={files}
      selectedFilesIds={selectedFilesIds}
      onSelectionModelChange={handleSelectionChange}
      onFileWantedChange={handleFileWantedChange}
      onFilePriorityChange={handleFilePriorityChange}
    />
  );
};

export default TorrentFilesTable;
