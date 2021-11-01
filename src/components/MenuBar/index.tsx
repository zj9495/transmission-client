import React from "react";
import clsx from "clsx";
import { useDebounce } from "react-use";

import { createStyles, makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import { Drawer, List, useMediaQuery, useTheme } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
// import WarningIcon from "@mui/icons-material/Warning";
import FindInPageIcon from "@mui/icons-material/FindInPage";

import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { toggleMenuOpen } from "src/store/actions/menu";
import { getMenuOpen } from "src/store/selector/menu";
import { getTorrents } from "src/store/selector/list";
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
    drawerPaper: {
      borderRight: 0,
    },
    drawerTop: {
      top: 48,
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
      [theme.breakpoints.down("sm")]: {
        width: 0,
      },
    },
    mobile: {
      width: drawerWidth,
    },
    menuList: {
      padding: 0,
    },
  })
);

export default function MenuBar() {
  const dispatch = useDispatch();
  const { torrentStatus } = useParams<IParamTypes>();
  const theme = useTheme();
  const history = useHistory();
  const classes = useStyles();
  const menuOpen = useSelector(getMenuOpen);
  const torrents = useSelector(getTorrents);
  const [mouseOver, setMouseOver] = React.useState(false);
  const [debouncedMouseOver, setDebouncedMouseOver] = React.useState(false);
  const isMoblie = useMediaQuery(theme.breakpoints.down("sm"));

  const menuTemporaryOpen = mouseOver && debouncedMouseOver;
  const open = menuTemporaryOpen || menuOpen;

  useDebounce(
    () => {
      setDebouncedMouseOver(mouseOver);
    },
    500,
    [mouseOver]
  );

  const handleListItemClick = (status: string) => {
    history.push(`/list/${status}`);
    if (isMoblie) {
      dispatch(toggleMenuOpen());
    }
  };

  const handleClose = () => {
    dispatch(toggleMenuOpen());
  };

  return (
    <Drawer
      anchor="left"
      variant={isMoblie ? undefined : "permanent"}
      open={isMoblie ? menuOpen : false}
      classes={{
        paper: clsx(
          classes.drawerPaper,
          isMoblie
            ? classes.mobile
            : {
                [classes.drawerShadow]:
                  isMoblie || (menuTemporaryOpen && !menuOpen),
                [classes.drawerTop]: true,
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }
        ),
      }}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      onMouseOver={() => {
        if (!isMoblie) {
          setMouseOver(true);
        }
      }}
      onMouseLeave={() => {
        if (!isMoblie) {
          setMouseOver(false);
        }
      }}
      onClose={handleClose}
    >
      <List className={classes.menuList}>
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
