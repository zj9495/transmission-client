import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import {
  DataGridPro,
  GridColDef,
  GridColTypeDef,
  GridCellParams,
} from "@mui/x-data-grid-pro";
import type { GridSelectionModel } from "@mui/x-data-grid-pro";
import { makeStyles, createStyles } from "@mui/styles";
import { useMediaQuery, useTheme } from "@mui/material";
import type { Theme } from "@mui/material";
import { find } from "lodash";

import { useParams } from "react-router-dom";

import { getLocale } from "src/store/selector/app";
import { getTorrents, getSelectedIds } from "src/store/selector/list";
import { setSelectedIds } from "src/store/actions/list";
import { showTorrentDetail } from "src/store/actions/detail";
import {
  formatSize,
  formatSpeed,
  formatUnixTimeStamp,
  formatLeftTime,
} from "src/utils/formatter";
import { IParamTypes, ITorrent, TorrentId } from "src/types";
import ContextMenu, { ContextMenuProps } from "src/components/ContextMenu";
import AppStatusBar from "src/components/AppStatusBar";
import ActionBar from "src/components/ActionBar";
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
      "& .MuiDataGrid-cell:focus-within": {
        outline: "none",
      },
    },
  })
);

const TorrentTable: React.FC = () => {
  const [contextMenuProps, setContextMenuProps] = React.useState<
    Omit<ContextMenuProps, "onClose">
  >({
    id: 0,
    open: false,
    x: null,
    y: null,
    torrent: null,
  });
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
        renderCell: (cellProps) => {
          const onClick = (id: TorrentId) => {
            dispatch(showTorrentDetail(id));
          };
          return renderName({ ...cellProps, onClick });
        },
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
        valueGetter: ({ value, row }) =>
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
        renderCell: (params) =>
          `${params.row.trackerStats[0]?.seederCount || 0} (${
            params.row.peersSendingToUs || 0
          })`,
      },
      {
        field: "leecherCount",
        headerName: intl.formatMessage({ id: "torrent.fields.leecherCount" }),
        width: COLUMNS_WIDTH[locale].leecherCount,
        renderCell: (params) =>
          `${params.row.trackerStats[0]?.leecherCount || 0} (${
            params.row.peersGettingFromUs || 0
          })`,
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
        field: "trackerNames",
        hide: true,
        headerName: intl.formatMessage({ id: "torrent.fields.trackers" }),
        valueFormatter: ({ value }) => value.join(","),
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
    [locale, intl]
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const toolbarLocaleText = React.useMemo(
    () =>
      isMobile
        ? {
            toolbarColumns: "",
            toolbarFilters: "",
            toolbarDensity: "",
            toolbarExport: "",
          }
        : {
            toolbarColumns: "Columns",
            toolbarFilters: "Filters",
            toolbarDensity: "Density",
            toolbarExport: "Export",
          },
    [isMobile]
  );

  const rows = torrents[torrentStatus];
  const tableHeight = React.useMemo(
    () => window.innerHeight - 48,
    [window.innerHeight]
  );

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const clickedTorrentId = Number(
      event.currentTarget.getAttribute("data-id")
    );
    setContextMenuProps({
      id: clickedTorrentId,
      open: true,
      x: event.clientX - 2,
      y: event.clientY - 4,
      torrent: find<ITorrent>(torrents[torrentStatus], {
        id: clickedTorrentId,
      }) as ITorrent,
    });
  };

  const handleSelectionChange = (model: GridSelectionModel) => {
    dispatch(setSelectedIds(model as number[]));
  };

  const handleClose = () => {
    setContextMenuProps({
      ...contextMenuProps,
      open: false,
    });
  };

  return (
    <div
      id="torrent-table"
      data-testid="torrent-table"
      style={{ height: tableHeight, width: "100%" }}
    >
      <DataGridPro
        className={classes.table}
        density="compact"
        components={{
          Toolbar: ActionBar,
          Footer: AppStatusBar,
        }}
        componentsProps={{
          row: {
            onContextMenu: handleContextMenu,
          },
        }}
        rows={rows}
        columns={columns}
        selectionModel={selectedIds}
        rowsPerPageOptions={[10, 20, 50, 100, 200, 5000, 10000]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={handleSelectionChange}
        localeText={toolbarLocaleText}
      />
      <ContextMenu {...contextMenuProps} onClose={handleClose} />
    </div>
  );
};

export default TorrentTable;
