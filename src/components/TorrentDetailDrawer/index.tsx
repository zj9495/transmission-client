import React, { useState } from "react";
import {
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Drawer,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";

import { useTorrent } from "src/hooks/swr";

import { getTorrentDetailOpen, getDetailId } from "src/store/selector";
import { hideTorrentDetail } from "src/store/actions/app";
import { FilesTable } from "src/components/TorrentFilesTable";
import TorrentSettings from "src/components/TorrentSettings";
import { TFile } from "src/types";

import BasicInfo from "./BasicInfo";
import ServerInfo from "./ServerInfo";
import UserTable from "./UserTable";

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

const TorrentDetailDrawer = () => {
  const dispatch = useDispatch();
  const open = useSelector(getTorrentDetailOpen);
  const id = useSelector(getDetailId);
  const [currentTab, setCurrentTab] = useState(0);
  const { torrent, isLoading } = useTorrent(id);

  React.useEffect(() => {
    if (open) {
      setCurrentTab(0);
    }
  }, [open]);

  const files = React.useMemo(() => {
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
    return result;
  }, [torrent]);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };
  const handleClose = () => {
    dispatch(hideTorrentDetail());
  };
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {isLoading ? <Skeleton /> : torrent?.name}
      </DialogTitle>

      <DialogContent>
        <Tabs
          value={currentTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
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
          <BasicInfo isLoading={isLoading} torrent={torrent} />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <ServerInfo
            isLoading={isLoading}
            trackerStats={torrent?.trackerStats || []}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <FilesTable files={files} />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <UserTable rows={torrent?.peers || []} />
        </TabPanel>
        <TabPanel value={currentTab} index={4}>
          <TorrentSettings id={id} />
        </TabPanel>
      </DialogContent>
    </Drawer>
  );
};

export default TorrentDetailDrawer;
