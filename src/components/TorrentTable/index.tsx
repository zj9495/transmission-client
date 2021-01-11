import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux'

import { getAllTorrents } from '../../store/selector'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const TorrentTable: React.FC = () => {
  const classes = useStyles()
  const torrents = useSelector(getAllTorrents)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">Total Size</TableCell>
            <TableCell align="right">Progress</TableCell>
            <TableCell align="right">Left Time</TableCell>
            <TableCell align="right">Upload Ratio</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Seeder</TableCell>
            <TableCell align="right">Leecher</TableCell>
            <TableCell align="right">Download Speed</TableCell>
            <TableCell align="right">Upload Speed</TableCell>
            <TableCell align="right">Complete size</TableCell>
            <TableCell align="right">Uploaded size</TableCell>
            <TableCell align="right">Date added</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Queue</TableCell>
            <TableCell align="right">Trackers</TableCell>
            <TableCell align="right">Download Dir</TableCell>
            <TableCell align="right">Activity Date</TableCell>
            <TableCell align="right">User Labels</TableCell>
            <TableCell align="right">Completed Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {torrents.map((torrent) => (
            <TableRow key={torrent.id}>
              <TableCell component="th" scope="row">
                {torrent.name}
              </TableCell>
              <TableCell align="right">{torrent.totalSize}</TableCell>
              <TableCell align="right">{torrent.percentDone}</TableCell>
              <TableCell align="right">{torrent.leftUntilDone}</TableCell>
              <TableCell align="right">{torrent.uploadRatio}</TableCell>
              <TableCell align="right">{torrent.status}</TableCell>
              <TableCell align="right">{torrent.seederCount}</TableCell>
              <TableCell align="right">{torrent.leecherCount}</TableCell>
              <TableCell align="right">{torrent.rateDownload}</TableCell>
              <TableCell align="right">{torrent.rateUpload}</TableCell>
              <TableCell align="right">{torrent.completeSize}</TableCell>
              <TableCell align="right">{torrent.uploadedEver}</TableCell>
              <TableCell align="right">{torrent.addedDate}</TableCell>
              <TableCell align="right">{torrent.id}</TableCell>
              <TableCell align="right">{torrent.queuePosition}</TableCell>
              <TableCell align="right">{torrent.trackers}</TableCell>
              <TableCell align="right">{torrent.downloadDir}</TableCell>
              <TableCell align="right">{torrent.activityDate}</TableCell>
              <TableCell align="right">{torrent.labels}</TableCell>
              <TableCell align="right">{torrent.doneDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TorrentTable