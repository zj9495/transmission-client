import React from "react"
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux'
import { XGrid, ColDef } from '@material-ui/x-grid';

import { getAllTorrents } from '../../store/selector'


const TorrentTable: React.FC = () => {
  const torrents = useSelector(getAllTorrents)
  const intl = useIntl();
  const columns: ColDef[] = [
    { field: 'name', headerName: intl.formatMessage({ id: 'torrent.fields.name' }), width: 130 },
    { field: 'totalSize', headerName: intl.formatMessage({ id: 'torrent.fields.totalSize' })},
    { field: 'percentDone', headerName: intl.formatMessage({ id: 'torrent.fields.percentDone' })},
    { field: 'leftUntilDone', headerName: intl.formatMessage({ id: 'torrent.fields.remainingTime' })},
    { field: 'uploadRatio', headerName: intl.formatMessage({ id: 'torrent.fields.uploadRatio' })},
    { field: 'status', headerName: intl.formatMessage({ id: 'torrent.fields.status' })},
    { field: 'seederCount', headerName: intl.formatMessage({ id: 'torrent.fields.seederCount' })},
    { field: 'leecherCount', headerName: intl.formatMessage({ id: 'torrent.fields.leecherCount' })},
    { field: 'rateDownload', headerName: intl.formatMessage({ id: 'torrent.fields.rateDownload' })},
    { field: 'rateUpload', headerName: intl.formatMessage({ id: 'torrent.fields.rateUpload' })},
    { field: 'completeSize', headerName: intl.formatMessage({ id: 'torrent.fields.completeSize' })},
    { field: 'uploadedEver', headerName: intl.formatMessage({ id: 'torrent.fields.uploadedEver' })},
    { field: 'addedDate', headerName: intl.formatMessage({ id: 'torrent.fields.addedDate' })},
    { field: 'queuePosition', headerName: intl.formatMessage({ id: 'torrent.fields.queuePosition' })},
    { field: 'trackers', headerName: intl.formatMessage({ id: 'torrent.fields.trackers' })},
    { field: 'downloadDir', headerName: intl.formatMessage({ id: 'torrent.fields.downloadDir' })},
    { field: 'activityDate', headerName: intl.formatMessage({ id: 'torrent.fields.activityDate' })},
    { field: 'labels', headerName: intl.formatMessage({ id: 'torrent.fields.labels' })},
    { field: 'doneDate', headerName: intl.formatMessage({ id: 'torrent.fields.doneDate' })},
  ];
  
  return (
    <div style={{ height: 800, width: '100%' }}>
      <XGrid
        rows={torrents} columns={columns} pageSize={20}
        loading={torrents.length === 0}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default TorrentTable