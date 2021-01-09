import React from 'react'
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SwapVertOutlinedIcon from '@material-ui/icons/SwapVertOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import WarningIcon from '@material-ui/icons/Warning';
import FindInPageIcon from '@material-ui/icons/FindInPage';

import { useSelector } from 'react-redux';

import { getMenuOpen, getAllTorrents } from '../../store/selector'
import { STATUS_TYPES } from '../../constants'

const drawerWidth = 240;
const closedDrawerWidth = 56

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerTop: {
      top: 64,
    },
    drawerShadow: {
      boxShadow: '0 16px 10px 0 rgba(0,0,0,0.14), 0 11px 18px 0 rgba(0,0,0,0.12), 0 13px 5px -1px rgba(0,0,0,0.2)',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: closedDrawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: closedDrawerWidth,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export default function MenuBar() {
  const classes = useStyles();
  const menuOpen = useSelector(getMenuOpen);
  const torrents = useSelector(getAllTorrents);
  const [menuTemporaryOpen, setMenuTemporaryOpen] = React.useState(false)
  const torrentNums = {
    all: torrents.length,
    stopped: torrents.filter(item=>item.status === STATUS_TYPES.stopped).length,
    checkwait: torrents.filter(item=>item.status === STATUS_TYPES.checkwait).length,
    check: torrents.filter(item=>item.status === STATUS_TYPES.check).length,
    downloadwait: torrents.filter(item=>item.status === STATUS_TYPES.downloadwait).length,
    download: torrents.filter(item=>item.status === STATUS_TYPES.download).length,
    seedwait: torrents.filter(item=>item.status === STATUS_TYPES.seedwait).length,
    seed: torrents.filter(item => item.status === STATUS_TYPES.seed).length,
    active: 0,
  }

  torrentNums.active = torrentNums.download + torrentNums.seed

  const open = menuTemporaryOpen || menuOpen
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
      onMouseOver={()=>{setMenuTemporaryOpen(true)}}
      onMouseLeave={()=>{setMenuTemporaryOpen(false)}}
    >
    <List>
      <ListItem button>
        <ListItemIcon><AllInboxIcon /></ListItemIcon>
        <ListItemText primary="All" />
        <span className={'MuiLabel-amount'}>{torrentNums.all}</span>
      </ListItem>
      <ListItem button>
        <ListItemIcon><InboxIcon /></ListItemIcon>
        <ListItemText primary="Downloading" />
        <span className={'MuiLabel-amount'}>{torrentNums.download}</span>
      </ListItem>
      <ListItem button>
        <ListItemIcon><InboxIcon /></ListItemIcon>
        <ListItemText primary="Download Waiting" />
        <span className={'MuiLabel-amount'}>{torrentNums.downloadwait}</span>
      </ListItem>
      <ListItem button>
        <ListItemIcon><PauseCircleOutlineIcon /></ListItemIcon>
        <ListItemText primary="Paused" />
        <span className={'MuiLabel-amount'}>{torrentNums.stopped}</span>
      </ListItem>
      <ListItem button>
        <ListItemIcon><SwapVertOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Active" />
        <span className={'MuiLabel-amount'}>{torrentNums.active}</span>
      </ListItem>
      <ListItem button>
        <ListItemIcon><CloudUploadIcon /></ListItemIcon>
        <ListItemText primary="Seeding" />
          <span className={'MuiLabel-amount'}>{torrentNums.seed}</span>
      </ListItem>
      <ListItem button>
        <ListItemIcon><CloudUploadIcon /></ListItemIcon>
        <ListItemText primary="Seed Waiting" />
        <span className={'MuiLabel-amount'}>{torrentNums.seedwait}</span>
      </ListItem>
      <ListItem button>
        <ListItemIcon><FindInPageIcon /></ListItemIcon>
        <ListItemText primary="Checking" />
        <span className={'MuiLabel-amount'}>{torrentNums.check}</span>
      </ListItem>
      <ListItem button>
        <ListItemIcon><HourglassEmptyIcon /></ListItemIcon>
        <ListItemText primary="Check Waiting" />
        <span className={'MuiLabel-amount'}>{torrentNums.checkwait}</span>
      </ListItem>
      <ListItem button>
        <ListItemIcon><WarningIcon /></ListItemIcon>
        <ListItemText primary="Warning" />
        <span className={'MuiLabel-amount'}>{torrentNums.seed}</span>
      </ListItem>
      <ListItem button>
        <ListItemIcon><ErrorOutlineIcon /></ListItemIcon>
        <ListItemText primary="Error" />
        <span className={'MuiLabel-amount'}>{torrentNums.seed}</span>
      </ListItem>
    </List>
  </Drawer>
  )
}