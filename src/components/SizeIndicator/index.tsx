import React from "react";
import { Box } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

import { formatSize } from "src/utils/formatter";
import { getSelectedFiles, getFreeDiskSpace } from "src/store/selector";

import { INVALID_STATUS } from "src/constants";

const SizeIndicator = () => {
  const selectedFiles = useSelector(getSelectedFiles);
  const freeDiskSpace = useSelector(getFreeDiskSpace);

  const selectedFilesSize = React.useMemo(() => {
    // eslint-disable-next-line unicorn/no-array-reduce
    const totalLength = selectedFiles.reduce(
      (accumulator, file) => accumulator + file.length,
      0
    );
    return formatSize(totalLength);
  }, [selectedFiles]);

  const formattedFreeDiskSpace = React.useMemo(() => {
    if (freeDiskSpace === INVALID_STATUS) {
      return "-";
    }
    return formatSize(freeDiskSpace);
  }, [freeDiskSpace]);
  return (
    <>
      <Box>
        <FormattedMessage id="dialog.addTorrent.size" />: {selectedFilesSize}
      </Box>
      <Box>
        <FormattedMessage id="dialog.addTorrent.freeSpace" />:
        {formattedFreeDiskSpace}
      </Box>
    </>
  );
};

export default SizeIndicator;
