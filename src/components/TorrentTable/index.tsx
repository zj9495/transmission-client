import React from "react"
import { DataGrid, ColDef } from '@material-ui/data-grid';

import { useSelector } from 'react-redux'

import { getAllTorrents } from '../../store/selector'


const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'totalSize', headerName: 'Total size'},
  { field: 'percentDone', headerName: 'Progress'},
  { field: 'leftUntilDone', headerName: 'Left Time'},
  { field: 'uploadRatio', headerName: 'Upload Ratio'},
  { field: 'status', headerName: 'Status'},
  { field: 'seederCount', headerName: 'Seeder'},
  { field: 'leecherCount', headerName: 'Leecher'},
  { field: 'rateDownload', headerName: 'Download Speed'},
  { field: 'rateUpload', headerName: 'Upload Speed'},
  { field: 'completeSize', headerName: 'Complete size'},
  { field: 'uploadedEver', headerName: 'Uploaded size'},
  { field: 'addedDate', headerName: 'Date added'},
  { field: 'queuePosition', headerName: 'Queue'},
  { field: 'trackers', headerName: 'Trackers'},
  { field: 'downloadDir', headerName: 'Download Dir'},
  { field: 'activityDate', headerName: 'Activity Date'},
  { field: 'labels', headerName: 'User Labels'},
  { field: 'doneDate', headerName: 'Completed Date'},
];

const TorrentTable: React.FC = () => {
  const torrents = useSelector(getAllTorrents)

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid rows={torrents} columns={columns} pageSize={20} checkboxSelection />
    </div>
  );
}

export default TorrentTable