import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { union, without } from "lodash";

import { getTorrentDownloadOptions } from "src/store/selector";
import { setDownloadSelectedFiles } from "src/store/actions/app";

const FilesFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { files, selectedFilesIds } = useSelector(getTorrentDownloadOptions);

  const fileExtensions: string[] = React.useMemo(
    () =>
      union(
        files.map((file) =>
          file.name
            .slice(Math.max(0, file.name.lastIndexOf(".") + 1))
            .toLowerCase()
        )
      ),
    [files]
  );

  const checks = React.useMemo(() => {
    const result = fileExtensions.map((extension) => {
      const matchFiles = files.filter((file) =>
        file.name.toLowerCase().endsWith(extension)
      );
      const selectedMatchFiles = matchFiles.filter((file) =>
        selectedFilesIds.includes(file.id.toString())
      );
      const indeterminate =
        selectedMatchFiles.length > 0 &&
        matchFiles.length > selectedMatchFiles.length;
      const checked = selectedMatchFiles.length > 0;
      return {
        name: extension,
        label: extension,
        checked,
        indeterminate,
      };
    });
    result.unshift({
      name: "all",
      label: "All",
      checked: selectedFilesIds.length > 0,
      indeterminate:
        selectedFilesIds.length > 0 && files.length > selectedFilesIds.length,
    });
    return result;
  }, [selectedFilesIds, files, fileExtensions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name: extension } = event.target;
    if (extension === "all") {
      const newSelectedFilesIds = checked ? files.map((file) => file.id) : [];
      dispatch(setDownloadSelectedFiles(newSelectedFilesIds));
    } else {
      const matchFilesIds = files
        .filter((file) => file.name.toLowerCase().endsWith(extension))
        .map((file) => file.id);
      const newSelectedFilesIds = checked
        ? union(selectedFilesIds, matchFilesIds)
        : without(
            selectedFilesIds.map((id) => Number(id)),
            ...matchFilesIds
          );
      dispatch(setDownloadSelectedFiles(newSelectedFilesIds));
    }
  };

  return (
    <FormGroup row>
      {checks.map((check) => (
        <FormControlLabel
          key={check.name}
          control={
            <Checkbox
              color="primary"
              checked={check.checked}
              onChange={handleChange}
              name={check.name}
              indeterminate={check.indeterminate}
            />
          }
          label={check.label}
        />
      ))}
    </FormGroup>
  );
};

export default FilesFilter;
