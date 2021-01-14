import React from "react"
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux'
import { XGrid, ColDef, ColTypeDef } from '@material-ui/x-grid';

import renderProgress from './renderProgress';
import renderName from './renderName';

import { getAllTorrents } from '../../store/selector'
import { formatSize, formatSpeed, formatUnixTimeStamp, formatLeftTime } from '../../utils/formatter'

const useSize: ColTypeDef = {
  type: 'number',
  width: 130,
  valueFormatter: ({ value }) => formatSize(Number(value)),
}

const useSpeed: ColTypeDef = {
  type: 'number',
  width: 130,
  valueFormatter: ({ value }) => formatSpeed(Number(value)),
}

const useTime: ColTypeDef = {
  type: 'number',
  width: 200,
  valueFormatter: ({ value }) => formatUnixTimeStamp(Number(value)),
}

const TorrentTable: React.FC = () => {
  const torrents = useSelector(getAllTorrents)
  const intl = useIntl();
  const formatStatus = (status: number): string => {
    return intl.formatMessage({ id: `torrent.statusText.${status}` })
  }
  const columns: ColDef[] = [
    { field: 'name', headerName: intl.formatMessage({ id: 'torrent.fields.name' }), width: 130, renderCell: renderName},
    { field: 'totalSize', headerName: intl.formatMessage({ id: 'torrent.fields.totalSize' }), ...useSize },
    {
      field: 'percentDone', headerName: intl.formatMessage({ id: 'torrent.fields.percentDone' }), type: 'number', width: 120, renderCell: renderProgress
    },
    { field: 'leftUntilDone', headerName: intl.formatMessage({ id: 'torrent.fields.remainingTime' }), valueFormatter: ({ value, row }) => value && row.rateDownload ? formatLeftTime(Number(value) / Number(row.rateDownload)) : ' ', },
    { field: 'uploadRatio', headerName: intl.formatMessage({ id: 'torrent.fields.uploadRatio' }) },
    { field: 'status', headerName: intl.formatMessage({ id: 'torrent.fields.status' }), valueFormatter: ({ value }) => formatStatus(Number(value)), },
    { field: 'seederCount', headerName: intl.formatMessage({ id: 'torrent.fields.seederCount' }) },
    { field: 'leecherCount', headerName: intl.formatMessage({ id: 'torrent.fields.leecherCount' }) },
    { field: 'rateDownload', headerName: intl.formatMessage({ id: 'torrent.fields.rateDownload' }), ...useSpeed },
    { field: 'rateUpload', headerName: intl.formatMessage({ id: 'torrent.fields.rateUpload' }), ...useSpeed },
    { field: 'completeSize', headerName: intl.formatMessage({ id: 'torrent.fields.completeSize' }), ...useSize },
    { field: 'uploadedEver', headerName: intl.formatMessage({ id: 'torrent.fields.uploadedEver' }), ...useSize },
    { field: 'addedDate', headerName: intl.formatMessage({ id: 'torrent.fields.addedDate' }), ...useTime },
    { field: 'queuePosition', headerName: intl.formatMessage({ id: 'torrent.fields.queuePosition' }) },
    { field: 'trackers', headerName: intl.formatMessage({ id: 'torrent.fields.trackers' }) },
    { field: 'downloadDir', headerName: intl.formatMessage({ id: 'torrent.fields.downloadDir' }) },
    { field: 'activityDate', headerName: intl.formatMessage({ id: 'torrent.fields.activityDate' }), ...useTime },
    { field: 'labels', headerName: intl.formatMessage({ id: 'torrent.fields.labels' }) },
    { field: 'doneDate', headerName: intl.formatMessage({ id: 'torrent.fields.doneDate' }), ...useTime },
  ];

  return (
    <div style={{ height: 'calc(100vh - 112px)', width: '100%' }}>
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