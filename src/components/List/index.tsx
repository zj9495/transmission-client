/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import clsx from "clsx";
import {
  IconButton,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Divider,
  Box,
} from "@mui/material";
import { LinearProgressProps } from "@mui/material/LinearProgress";
import GitHubIcon from "@mui/icons-material/GitHub";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@mui/styles";
import type { Theme } from "@mui/material";

import {
  getSizeBytesSelector,
  getSizeUnitsSelector,
  getSpeedBytesSelector,
  getSpeedUnitsSelector,
} from "src/store/selector/session";
import { getMenuOpen } from "src/store/selector/menu";
import {
  getSessionAction,
  getSessionStatsAction,
} from "src/store/actions/session";
import { getTorrentsAction } from "src/store/actions/list";
import { IState, ISession } from "src/types";
import Progress from "src/components/Progress";
import ActionBar from "src/components/ActionBar";
import MenuBar from "src/components/MenuBar";
import TorrentTable from "src/components/TorrentTable";
import AddTorrentDialog from "src/components/AddTorrentDialog";
import TorrentDownloadOptionsDialog from "src/components/TorrentDownloadOptionsDialog";
import RemoveTorrentDialog from "src/components/RemoveTorrentDialog";
import AppStatusBar from "src/components/AppStatusBar";
import { REFRESH_INTERVAL } from "src/constants";

import TorrentDetailDrawer from "../TorrentDetailDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    container: {
      marginLeft: 56,
      transition: theme.transitions.create("margin-left", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
    menuOpen: {
      marginLeft: 240,
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
  })
);

const Torrents: React.FC = () => {
  const dispatch = useDispatch();
  const torrents = useSelector((state: IState) => state.list.torrents);

  const progressConfig = {
    sizeBytes: useSelector(getSizeBytesSelector),
    sizeUnits: useSelector(getSizeUnitsSelector),
    speedBytes: useSelector(getSpeedBytesSelector),
    speedUnits: useSelector(getSpeedUnitsSelector),
  };

  useEffect(() => {
    dispatch(getSessionAction());
    setInterval(() => {
      dispatch(getTorrentsAction());
      dispatch(getSessionStatsAction());
    }, REFRESH_INTERVAL);
  }, []);

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const menuOpen = useSelector(getMenuOpen);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <MenuBar />
      <Box
        className={clsx(classes.container, {
          [classes.menuOpen]: menuOpen,
        })}
      >
        <ActionBar />
        <AddTorrentDialog />
        <TorrentDownloadOptionsDialog />
        <RemoveTorrentDialog />
        <TorrentDetailDrawer />
        <TorrentTable />
        {/* <List component="nav" aria-label="main mailbox folders">
          {torrents.map((torrent, index) => {
            return (
              <ListItem
                button
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
                key={index}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={torrent.name} secondary={
                  <Progress torrent={torrent} config={progressConfig}/>
                } />
              </ListItem>
            );
          })}
        </List> */}
        <AppStatusBar />
      </Box>
    </div>
  );
};

export default Torrents;
