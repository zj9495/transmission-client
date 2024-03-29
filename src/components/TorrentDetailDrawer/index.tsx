import React, { useState } from "react";
import {
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Drawer,
} from "@mui/material";
import { Skeleton } from "@mui/lab";
import { makeStyles, createStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";

import { useTorrent } from "src/hooks/swr";

import { getTorrentDetailOpen, getDetailId } from "src/store/selector/detail";
import { hideTorrentDetail } from "src/store/actions/detail";
import { FilesTable } from "src/components/TorrentFilesTable";
import type {
  FileWantedChangeParams,
  FilePriorityChangeParams,
} from "src/components/TorrentFilesTable";
import TorrentSettings from "src/components/TorrentSettings";
import { TFile } from "src/types";
import { setTorrent } from "src/api";

import BaseInfo from "./BaseInfo";
import TrackersInfo from "./TrackersInfo";
import PeersTable from "./PeersTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1.5}>{children}</Box>}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      wordBreak: "break-all",
    },
    content: {
      minHeight: "500px",
    },
  })
);

const TorrentDetailDrawer = () => {
  const dispatch = useDispatch();
  const open = useSelector(getTorrentDetailOpen);
  const id = useSelector(getDetailId);
  const [currentTab, setCurrentTab] = useState(0);
  const [files, setFiles] = useState<TFile[]>([]);
  const { torrent, isLoading } = useTorrent(id);
  const classes = useStyles();

  React.useEffect(() => {
    if (open) {
      setCurrentTab(0);
    }
  }, [open]);

  React.useEffect(() => {
    let result: TFile[] = [];
    if (torrent) {
      result = (torrent?.files || []).map((item, index) => ({
        ...item,
        ...torrent?.fileStats[index],
        id: index,
        percentDone: item.bytesCompleted / item.length,
        fileFormat: item.name.slice(
          item.name.lastIndexOf(".") + 1,
          item.name.length
        ),
      }));
    }
    setFiles(result);
  }, [torrent]);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };
  const handleClose = () => {
    dispatch(hideTorrentDetail());
  };

  const handleFileWantedChange = (params: FileWantedChangeParams) => {
    setFiles((oldFiles) => {
      const newFiles = oldFiles.map((file) => {
        const param = params.find((item) => item.id === file.id);
        return {
          ...file,
          wanted: param ? param.value : file.wanted,
        };
      });
      return newFiles;
    });

    const filesWanted = params
      .filter((file) => file.value)
      .map((file) => file.id);
    const filesUnwanted = params
      .filter((file) => !file.value)
      .map((file) => file.id);

    setTorrent({
      id: id as number,
      filesWanted,
      filesUnwanted,
    });
  };

  const handleFilePriorityChange = (params: FilePriorityChangeParams) => {
    setFiles((oldFiles) => {
      const newFiles = oldFiles.map((file) => {
        const param = params.find((item) => item.id === file.id);
        return {
          ...file,
          priority: param ? param.value : file.priority,
        };
      });
      return newFiles;
    });

    const priorityLow = params
      .filter((file) => file.value === -1)
      .map((file) => file.id);
    const priorityNormal = params
      .filter((file) => file.value === 0)
      .map((file) => file.id);
    const priorityHigh = params
      .filter((file) => file.value === 1)
      .map((file) => file.id);

    setTorrent({
      id: id as number,
      priorityLow,
      priorityNormal,
      priorityHigh,
    });
  };
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      data-testid="torrent-detail-drawer"
    >
      <DialogTitle
        className={classes.title}
        id="alert-dialog-title"
        data-testid="torrent-detail-title"
      >
        {isLoading ? <Skeleton /> : torrent?.name}
      </DialogTitle>

      <DialogContent className={classes.content}>
        <Tabs
          value={currentTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="torrent detail tabs"
          data-testid="torrent-detail-tabs"
        >
          <Tab
            label={<FormattedMessage id="torrent.attribute.tabs.base" />}
            {...a11yProps(0)}
          />
          <Tab
            label={<FormattedMessage id="torrent.attribute.tabs.servers" />}
            {...a11yProps(1)}
          />
          <Tab
            label={<FormattedMessage id="torrent.attribute.tabs.files" />}
            {...a11yProps(2)}
          />
          <Tab
            label={<FormattedMessage id="torrent.attribute.tabs.users" />}
            {...a11yProps(3)}
          />
          <Tab
            label={<FormattedMessage id="torrent.attribute.tabs.config" />}
            {...a11yProps(4)}
          />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <BaseInfo isLoading={isLoading} torrent={torrent} />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <TrackersInfo
            isLoading={isLoading}
            trackerStats={torrent?.trackerStats || []}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <FilesTable
            files={files}
            simple
            onFileWantedChange={handleFileWantedChange}
            onFilePriorityChange={handleFilePriorityChange}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <PeersTable rows={torrent?.peers || []} />
        </TabPanel>
        <TabPanel value={currentTab} index={4}>
          <TorrentSettings id={id} />
        </TabPanel>
      </DialogContent>
    </Drawer>
  );
};

export default TorrentDetailDrawer;
