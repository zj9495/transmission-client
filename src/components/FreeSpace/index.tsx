import React from "react";
import { useIntl } from "react-intl";
import { useDebounce } from "react-use";

import { useFreeSpace } from "src/hooks/swr";
import { formatSize } from "src/utils/formatter";

import { INVALID_STATUS } from "src/constants";

type Props = {
  path: string;
};

const FreeSpace = (props: Props) => {
  const { path } = props;
  const intl = useIntl();
  const [debouncedPath, setDebouncedPath] = React.useState(path);

  const { data, isError, isLoading } = useFreeSpace(debouncedPath);

  useDebounce(
    () => {
      setDebouncedPath(path);
    },
    1000,
    [path]
  );

  const formattedFreeDiskSpace = React.useMemo(() => {
    if (isError || isLoading || data === INVALID_STATUS) {
      return "-";
    }
    return formatSize(data);
  }, [data]);

  return (
    <>
      {`${intl.formatMessage({
        id: "dialog.addTorrent.freeSpace",
      })}: ${formattedFreeDiskSpace}`}
    </>
  );
};

export default FreeSpace;
