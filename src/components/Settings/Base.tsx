/* eslint-disable react/jsx-no-duplicate-props */

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useIntl, FormattedMessage } from "react-intl";

import {
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  InputAdornment,
} from "@material-ui/core";

import TextFieldWithSwitch from "src/components/TextFieldWithSwitch";
import FreeSpace from "src/components/FreeSpace";
import LanguageToggle from "src/components/LanguageToggle";

const Base = () => {
  const intl = useIntl();
  const { register, control, errors, watch } = useFormContext();

  const watchDownloadDir = watch("downloadDir");

  const handleDownloadDirBlur = (e: React.ChangeEvent) => {
    console.log(e);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="renamePartialFiles"
          control={control}
          render={({ value, onChange }) => (
            <FormControlLabel
              label={
                <FormattedMessage id="dialog.systemConfig.renamePartialFiles" />
              }
              control={
                <Switch
                  inputProps={{
                    // waiting for https://github.com/microsoft/TypeScript/issues/28960
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "data-testid": "rename-partial-files",
                  }}
                  size="small"
                  name="renamePartialFiles"
                  checked={Boolean(value)}
                  color="primary"
                  onChange={(e) => onChange(e.target.checked)}
                />
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="startAddedTorrents"
          control={control}
          render={({ value, onChange }) => (
            <FormControlLabel
              label={
                <FormattedMessage id="dialog.systemConfig.startAddedTorrents" />
              }
              control={
                <Switch
                  inputProps={{
                    // waiting for https://github.com/microsoft/TypeScript/issues/28960
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "data-testid": "start-added-torrents",
                  }}
                  size="small"
                  name="startAddedTorrents"
                  checked={Boolean(value)}
                  color="primary"
                  onChange={(e) => onChange(e.target.checked)}
                />
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          inputProps={{
            "data-testid": "download-dir",
          }}
          error={!!errors.downloadDir}
          name="downloadDir"
          variant="outlined"
          size="small"
          label={<FormattedMessage id="dialog.torrentAdd.downloadDir" />}
          fullWidth
          required
          inputRef={register({
            required: intl.formatMessage({ id: "message.validation.required" }),
          })}
          onBlur={handleDownloadDirBlur}
          helperText={
            errors.downloadDir?.message || (
              <FreeSpace path={watchDownloadDir} />
            ) ||
            ""
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldWithSwitch
          textFieldName="incompleteDir"
          switchName="incompleteDirEnabled"
          labelId="dialog.systemConfig.incompleteDirEnabled"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="number"
          inputProps={{
            "data-testid": "cache-size-Mb",
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">MB</InputAdornment>,
          }}
          error={!!errors.cacheSizeMb}
          name="cacheSizeMb"
          variant="outlined"
          size="small"
          label={<FormattedMessage id="dialog.systemConfig.cacheSizeMb" />}
          fullWidth
          required
          inputRef={register({
            valueAsNumber: true,
            required: intl.formatMessage({ id: "message.validation.required" }),
            min: {
              value: 0,
              message: intl.formatMessage(
                { id: "message.validation.min" },
                { num: "0" }
              ),
            },
          })}
          helperText={errors.cacheSizeMb?.message || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldWithSwitch
          textFieldName="scriptTorrentDoneFilename"
          switchName="scriptTorrentDoneEnabled"
          labelId="dialog.systemConfig.scriptTorrentDoneEnabled"
          TextFieldProps={{
            multiline: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          inputProps={{
            "data-testid": "config-dir",
          }}
          InputProps={{
            readOnly: true,
          }}
          error={!!errors.configDir}
          name="configDir"
          variant="outlined"
          size="small"
          label={<FormattedMessage id="dialog.systemConfig.configDir" />}
          fullWidth
          inputRef={register}
          helperText={errors.configDir?.message || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LanguageToggle />
      </Grid>
    </Grid>
  );
};

export default Base;
