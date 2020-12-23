import request from './request';

export const getSessionId = () => request({
  method: 'post',
  withCredentials: true
});

export const getSession = () => request({
  method: 'post',
  data: { "method": "session-get", "arguments":{}, "tag": "" },
  withCredentials: true
});

export const getAllTorrents = () => request({
  method: 'post',
  data: { "method": "torrent-get", "arguments":{"fields":["id","name","status","hashString","totalSize","percentDone","addedDate","trackerStats","leftUntilDone","rateDownload","rateUpload","recheckProgress","rateDownload","rateUpload","peersGettingFromUs","peersSendingToUs","uploadRatio","uploadedEver","downloadedEver","downloadDir","error","errorString","doneDate","queuePosition","activityDate"]}, "tag": "" },
  withCredentials: true
});