import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SwapVertOutlinedIcon from "@material-ui/icons/SwapVertOutlined";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import WarningIcon from "@material-ui/icons/Warning";
import FindInPageIcon from "@material-ui/icons/FindInPage";

import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import renderListItem from "./renderListItem";

import {
  getMenuOpen,
  getAllTorrents,
  getDownloadingTorrents,
  getDownloadWaitingTorrents,
  getPausedTorrents,
  getActiveTorrents,
  getSeedingTorrents,
  getSeedWaitingTorrents,
  getCheckingTorrents,
  getCheckWaitingTorrents,
  getWarningTorrents,
  getErrorTorrents,
} from "../../store/selector";
import { IParamTypes } from "../../types";

const drawerWidth = 240;
const closedDrawerWidth = 56;

const torrentStatusList = [
  {
    status: "all",
    textId: "tree.all",
    icon: <AllInboxIcon />,
    hideOnZero: false,
  },
  {
    status: "downloading",
    textId: "tree.downloading",
    icon: <InboxIcon />,
    hideOnZero: false,
    children: {
      status: "download-waiting",
      textId: "tree.wait",
      icon: <HourglassEmptyIcon />,
      hideOnZero: true,
    },
  },
  {
    status: "paused",
    textId: "tree.paused",
    icon: <PauseCircleOutlineIcon />,
    hideOnZero: false,
  },
  {
    status: "active",
    textId: "tree.active",
    icon: <SwapVertOutlinedIcon />,
    hideOnZero: false,
  },
  {
    status: "seeding",
    textId: "tree.sending",
    icon: <CloudUploadIcon />,
    hideOnZero: false,
    children: {
      status: "seed-waiting",
      textId: "tree.wait",
      icon: <HourglassEmptyIcon />,
      hideOnZero: true,
    },
  },
  {
    status: "checking",
    textId: "tree.check",
    icon: <FindInPageIcon />,
    hideOnZero: true,
    children: {
      status: "check-waiting",
      textId: "tree.wait",
      icon: <HourglassEmptyIcon />,
      hideOnZero: true,
    },
  },
  {
    status: "warning",
    textId: "tree.warning",
    icon: <WarningIcon />,
    hideOnZero: true,
  },
  {
    status: "error",
    textId: "tree.error",
    icon: <ErrorOutlineIcon />,
    hideOnZero: true,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerTop: {
      top: 64,
    },
    drawerShadow: {
      boxShadow:
        "0 16px 10px 0 rgba(0,0,0,0.14), 0 11px 18px 0 rgba(0,0,0,0.12), 0 13px 5px -1px rgba(0,0,0,0.2)",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: closedDrawerWidth,
      [theme.breakpoints.up("sm")]: {
        width: closedDrawerWidth,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface ITorrentNums {
  [propName: string]: number;
}

export default function MenuBar() {
  const { torrentStatus } = useParams<IParamTypes>();
  const history = useHistory();
  const classes = useStyles();
  const menuOpen = useSelector(getMenuOpen);
  const [menuTemporaryOpen, setMenuTemporaryOpen] = React.useState(false);
  const torrentNums: ITorrentNums = {
    all: useSelector(getAllTorrents).length,
    paused: useSelector(getPausedTorrents).length,
    checkWaiting: useSelector(getCheckWaitingTorrents).length,
    checking: useSelector(getCheckingTorrents).length,
    downloadWaiting: useSelector(getDownloadWaitingTorrents).length,
    downloading: useSelector(getDownloadingTorrents).length,
    seedWaiting: useSelector(getSeedWaitingTorrents).length,
    seeding: useSelector(getSeedingTorrents).length,
    active: useSelector(getActiveTorrents).length,
    warning: useSelector(getWarningTorrents).length,
    error: useSelector(getErrorTorrents).length,
  };
  const open = menuTemporaryOpen || menuOpen;

  const handleListItemClick = (status: string) => {
    history.push(`/list/${status}`);
  };
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx({
          [classes.drawerTop]: true,
          [classes.drawerShadow]: menuTemporaryOpen && !menuOpen,
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      onMouseOver={() => {
        setMenuTemporaryOpen(true);
      }}
      onMouseLeave={() => {
        setMenuTemporaryOpen(false);
      }}
    >
      <List>
        {torrentStatusList.map((item) =>
          item.hideOnZero && !torrentNums[item.status]
            ? null
            : renderListItem({
                text: <FormattedMessage id={item.textId} />,
                icon: item.icon,
                num: torrentNums[item.status],
                selected: torrentStatus === item.status,
                onClick: () => {
                  handleListItemClick(item.status);
                },
                children: item.children
                  ? renderListItem({
                      text: <FormattedMessage id={item.children.textId} />,
                      icon: item.children.icon,
                      onClick: () => {
                        handleListItemClick(item.children.status);
                      },
                      selected: torrentStatus === item.children.status,
                      num: torrentNums[item.children.status],
                      isChildren: true,
                    })
                  : null,
              })
        )}
      </List>
    </Drawer>
  );
}
