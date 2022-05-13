import React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import {
  DataGridPro,
  GridColDef,
  GridColTypeDef,
  GridSelectionModel,
  useGridApiContext,
  useGridSelector,
  selectedGridRowsSelector,
} from "@mui/x-data-grid-pro";
import { Button, Menu, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import {
  bindTrigger,
  bindMenu,
  usePopupState,
} from "material-ui-popup-state/hooks";
import FlagIcon from "@mui/icons-material/Flag";

import { getTorrentDownloadOptions } from "src/store/selector/add";
import {
  setDownloadSelectedFiles,
  setDownloadFilesWanted,
  setDownloadFilesPriority,
} from "src/store/actions/add";
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
  id: number;
  value: boolean;
}[];

export type FilePriorityChangeParams = {
  id: number;
  value: 1 | 0 | -1;
}[];

export type FilesTableProps = {
  files: TFile[];
  simple?: boolean;
  onFileWantedChange?: (params: FileWantedChangeParams) => void;
  onFilePriorityChange?: (params: FilePriorityChangeParams) => void;
  selectedFilesIds?: number[];
  onSelectionModelChange?: (params: GridSelectionModel) => void;
};

type ToolbarProps = Required<
  Pick<FilesTableProps, "onFileWantedChange" | "onFilePriorityChange">
>;

const Toolbar = (props: ToolbarProps) => {
  const { onFileWantedChange, onFilePriorityChange } = props;
  const apiRef = useGridApiContext();
  const selectedRows = useGridSelector(apiRef, selectedGridRowsSelector);
  // eslint-disable-next-line unicorn/prefer-spread
  const selectedRowIds = Array.from(selectedRows.keys());
  const wantedPopupState = usePopupState({
    variant: "popover",
    popupId: "files-wanted",
  });
  const priorityPopupState = usePopupState({
    variant: "popover",
    popupId: "files-priority",
  });
  const handleWantedChange = (wanted: boolean) => {
    //
    const parmas = selectedRowIds.map((id) => ({
      id: Number(id),
      value: wanted,
    }));
    onFileWantedChange(parmas);
    wantedPopupState.close();
  };
  const handlePriorityChange = (priority: 1 | 0 | -1) => {
    //
    const parmas = selectedRowIds.map((id) => ({
      id: Number(id),
      value: priority,
    }));
    onFilePriorityChange(parmas);
    priorityPopupState.close();
  };
  return (
    <div>
      <Button {...bindTrigger(wantedPopupState)}>
        <FormattedMessage id="torrent.attribute.filesFields.wanted" />
      </Button>
      <Menu {...bindMenu(wantedPopupState)}>
        <MenuItem onClick={() => handleWantedChange(false)}>
          <FormattedMessage id="torrent.attribute.status.false" />
        </MenuItem>
        <MenuItem onClick={() => handleWantedChange(true)}>
          <FormattedMessage id="torrent.attribute.status.true" />
        </MenuItem>
      </Menu>
      <Button {...bindTrigger(priorityPopupState)}>
        <FormattedMessage id="torrent.attribute.filesFields.priority" />
      </Button>
      <Menu {...bindMenu(priorityPopupState)}>
        <MenuItem onClick={() => handlePriorityChange(1)}>
          <FlagIcon color="secondary" />
          <FormattedMessage id="torrent.attribute.priority.high" />
        </MenuItem>
        <MenuItem onClick={() => handlePriorityChange(0)}>
          <FlagIcon color="primary" />
          <FormattedMessage id="torrent.attribute.priority.normal" />
        </MenuItem>
        <MenuItem onClick={() => handlePriorityChange(-1)}>
          <FlagIcon color="action" />
          <FormattedMessage id="torrent.attribute.priority.low" />
        </MenuItem>
      </Menu>
    </div>
  );
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
          const onChange = (event: SelectChangeEvent<unknown>) => {
            const value = Boolean(event.target.value);
            const id = cellProps.id as number;
            onFileWantedChange && onFileWantedChange([{ id, value }]);
          };
          return renderWantedSelect({
            ...cellProps,
            selectProps: { onChange },
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
          const onChange = (event: SelectChangeEvent<unknown>) => {
            const value = event.target.value as 1 | 0 | -1;
            const id = cellProps.id as number;
            onFilePriorityChange && onFilePriorityChange([{ id, value }]);
          };
          return renderPrioritySelect({
            ...cellProps,
            selectProps: { onChange },
          });
        },
      },
    ],
    [intl]
  );
  const groupingColDef = React.useMemo<GridColDef>(
    () => ({
      field: "name",
      headerName: intl.formatMessage({
        id: "torrent.attribute.filesFields.name",
      }),
      flex: 1,
    }),
    [intl]
  );

  return (
    <div data-testid="files-table" style={{ height: "400px" }}>
      <DataGridPro
        density="compact"
        rows={files}
        columns={columns}
        components={{
          Toolbar: simple ? Toolbar : undefined,
        }}
        componentsProps={{
          toolbar: {
            onFileWantedChange,
            onFilePriorityChange,
          },
        }}
        treeData
        groupingColDef={groupingColDef}
        getTreeDataPath={(row) => row.name.split("/")}
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

  const handleSelectionChange = (model: GridSelectionModel) => {
    dispatch(setDownloadSelectedFiles(model));
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
