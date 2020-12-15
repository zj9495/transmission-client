import React, {useEffect} from 'react';
import { IconButton,Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useDispatch, useSelector } from 'react-redux';

import { getSessionIdAction, getAllTorrentsAction } from '../../store/actions';
import { IAppState } from '../../store/reducers'

const List: React.FC = () => {
  const dispatch = useDispatch();
  const torrents = useSelector((state: IAppState) => state.allTorrents)
  console.log('torrents: ', torrents);

  useEffect(() => {
    dispatch(getSessionIdAction());
  });

  const handleClick = () => {
    dispatch(getAllTorrentsAction());
  }

  return (
    <div>
      <IconButton
        color="inherit"
        data-ga-event-category="header"
          data-ga-event-action="github"
          onClick={handleClick}
      >
        <GitHubIcon />
      </IconButton>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>名称</TableCell>
            <TableCell align="right">总大小</TableCell>
            <TableCell align="right">状态</TableCell>
            <TableCell align="right">进度</TableCell>
            <TableCell align="right">剩余时间</TableCell>
            <TableCell align="right">分享率</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {torrents.map((torrent: any) => (
            <TableRow key={torrent.id}>
              <TableCell component="th" scope="row">
                {torrent.name}
              </TableCell>
              <TableCell align="right">
                <p>{torrent.totalSize}</p>
                <p>{torrent.totalSize}</p>
              </TableCell>
              <TableCell align="right">{torrent.status}</TableCell>
              <TableCell align="right">{torrent.totalSize}</TableCell>
              <TableCell align="right">{torrent.totalSize}</TableCell>
              <TableCell align="right">{torrent.uploadRatio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default List;
