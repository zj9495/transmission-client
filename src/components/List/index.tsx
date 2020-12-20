import React, { useEffect } from "react";
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
} from "@material-ui/core";
import { LinearProgressProps } from "@material-ui/core/LinearProgress";
import GitHubIcon from "@material-ui/icons/GitHub";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { getSessionIdAction, getAllTorrentsAction } from "../../store/actions";
import { IAppState } from "../../store/reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Torrents: React.FC = () => {
  const dispatch = useDispatch();
  const torrents = useSelector((state: IAppState) => state.allTorrents);

  useEffect(() => {
    dispatch(getSessionIdAction());
  }, []);

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const handleClick = () => {
    dispatch(getAllTorrentsAction());
  };

  const formatPercent = (totalSize: number, downloadSize: number): number => {
    let percent = downloadSize / totalSize * 100
    if (percent > 100) {
      percent = 100
    } else if (percent < 0) {
      percent =0
    }
    return percent
  }

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        data-ga-event-category="header"
        data-ga-event-action="github"
        onClick={handleClick}
      >
        <GitHubIcon />
      </IconButton>
      <List component="nav" aria-label="main mailbox folders">
        {torrents.map((torrent: any, index) => {
          return (
            <ListItem
              button
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
              key={index}
            >
              {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
              <ListItemText primary={torrent.name} secondary={
                <LinearProgress variant="determinate" value={formatPercent(torrent.totalSize, torrent.downloadedEver)}/>
              } />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Torrents;
