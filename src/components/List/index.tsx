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
} from "@material-ui/core";
import { LinearProgressProps } from "@material-ui/core/LinearProgress";
import GitHubIcon from "@material-ui/icons/GitHub";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import {
  getSizeBytesSelector,
  getSizeUnitsSelector,
  getSpeedBytesSelector,
  getSpeedUnitsSelector,
  getMenuOpen,
} from "src/store/selector";

import {
  getSessionAction,
  getTorrentsAction,
  getSessionStatsAction,
} from "src/store/actions/rpc";
import { IState, ISession } from "src/types";
import Progress from "src/components/Progress";
import ActionBar from "src/components/ActionBar";
import MenuBar from "src/components/MenuBar";

import TorrentTable from "src/components/TorrentTable";
import AddTorrentDialog from "src/components/AddTorrentDialog";
import AppStatusBar from "src/components/AppStatusBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    container: {
      marginLeft: 56,
    },
    menuOpen: {
      marginLeft: 240,
    },
  })
);

const Torrents: React.FC = () => {
  const dispatch = useDispatch();
  const torrents = useSelector((state: IState) => state.rpc.torrents);

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
    }, 5000);
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
