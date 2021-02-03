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
// import WarningIcon from "@material-ui/icons/Warning";
import FindInPageIcon from "@material-ui/icons/FindInPage";

import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { getMenuOpen, getTorrents } from "src/store/selector";
import { IParamTypes, TorrentStatus } from "src/types";
import MenuItem from "./MenuItem";

export interface IMenu {
  status: TorrentStatus;
  textId: string;
  icon: React.ReactNode;
  hideOnZero: boolean;
}

const drawerWidth = 240;
const closedDrawerWidth = 56;

const menus: IMenu[] = [
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
  },
  {
    status: "downloadWaiting",
    textId: "tree.wait",
    icon: <HourglassEmptyIcon />,
    hideOnZero: true,
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
  },
  {
    status: "seedWaiting",
    textId: "tree.wait",
    icon: <HourglassEmptyIcon />,
    hideOnZero: true,
  },
  {
    status: "checking",
    textId: "tree.check",
    icon: <FindInPageIcon />,
    hideOnZero: true,
  },
  {
    status: "checkWaiting",
    textId: "tree.wait",
    icon: <HourglassEmptyIcon />,
    hideOnZero: true,
  },
  // {
  //   status: "warning",
  //   textId: "tree.warning",
  //   icon: <WarningIcon />,
  //   hideOnZero: true,
  // },
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

export default function MenuBar() {
  const { torrentStatus } = useParams<IParamTypes>();
  const history = useHistory();
  const classes = useStyles();
  const menuOpen = useSelector(getMenuOpen);
  const torrents = useSelector(getTorrents);
  const [menuTemporaryOpen, setMenuTemporaryOpen] = React.useState(false);

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
        {menus
          .filter(
            (item) => !item.hideOnZero || torrents[item.status].length > 0
          )
          .map((item) => (
            <MenuItem
              key={item.status}
              text={<FormattedMessage id={item.textId} />}
              icon={item.icon}
              num={torrents[item.status].length}
              selected={torrentStatus === item.status}
              menuOpen={open}
              onClick={() => {
                handleListItemClick(item.status);
              }}
            />
          ))}
      </List>
    </Drawer>
  );
}
